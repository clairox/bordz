import { NextRequest, NextResponse } from 'next/server'
import { desc, eq } from 'drizzle-orm'

import { createNotFoundError, createUnauthorizedError } from '@/lib/errors'
import { decodeSessionToken, handleRoute } from '../shared'
import { db } from '@/drizzle/db'
import { CustomerTable } from '@/drizzle/schema/user'
import { OrderTable } from '@/drizzle/schema/order'

export const GET = async (request: NextRequest) => {
    return await handleRoute(async () => {
        const session = request.cookies.get('session')?.value
        if (!session) {
            throw createUnauthorizedError('Missing session token')
        }

        const { sub } = decodeSessionToken(session)

        const customer = await db.query.CustomerTable.findFirst({
            where: eq(CustomerTable.userId, sub),
        })

        if (!customer) {
            throw createNotFoundError('Customer')
        }

        const orders = await db.query.OrderTable.findMany({
            where: eq(OrderTable.customerId, customer.id),
            orderBy: [desc(OrderTable.createdAt)],
            with: {
                lines: {
                    with: {
                        product: {
                            with: {
                                boardSetup: {
                                    with: {
                                        deck: true,
                                        trucks: true,
                                        wheels: true,
                                        bearings: true,
                                        hardware: true,
                                        griptape: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        })

        return NextResponse.json(orders)
    })
}
