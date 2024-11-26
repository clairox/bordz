import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { OrderTable } from '@/drizzle/schema/order'
import { createNotFoundError, handleError } from '@/lib/errors'

export const GET = async (
    _: NextRequest,
    context: { params: { orderId: string } }
) => {
    const { orderId } = context.params
    if (!orderId) {
        throw createNotFoundError('Order')
    }

    try {
        const order = await db.query.OrderTable.findFirst({
            where: eq(OrderTable.id, orderId),
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

        return NextResponse.json(order)
    } catch (error) {
        handleError(error)
    }
}
