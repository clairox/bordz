import { NextRequest, NextResponse } from 'next/server'
import { desc, eq } from 'drizzle-orm'

import {
    handleRoute,
    calculateNextPageNumber,
    getRequestOptionsParams,
} from '../shared'
import { db } from '@/drizzle/db'
import { OrderTable } from '@/drizzle/schema/order'

export const GET = async (request: NextRequest) =>
    await handleRoute(async () => {
        const { page, size } = getRequestOptionsParams(request)
        const customerId = request.nextUrl.searchParams.get('customer')

        const where = customerId
            ? eq(OrderTable.customerId, customerId)
            : undefined

        const orders = await db.query.OrderTable.findMany({
            where,
            limit: size,
            offset: (page - 1) * size,
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
                customer: true,
                shippingAddress: true,
            },
        })

        const nextPage = await calculateNextPageNumber(
            page,
            size,
            OrderTable,
            where
        )

        return NextResponse.json({ data: orders, nextPage })
    })
