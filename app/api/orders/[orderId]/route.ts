import { db } from '@/drizzle/db'
import handleError from '@/lib/errorHandling'
import { OrderTable } from '@/drizzle/schema/order'
import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'
import { createNotFoundError } from '@/app/api/shared'

export const GET = async (
    _: NextRequest,
    context: { params: { orderId: string } }
) => {
    const { orderId } = context.params
    if (orderId == undefined) {
        throw createNotFoundError('Order')
    }

    try {
        const order = await db.query.OrderTable.findFirst({
            where: eq(OrderTable.id, orderId),
            with: {
                lines: {
                    with: {
                        product: true,
                    },
                },
            },
        })

        return NextResponse.json(order)
    } catch (error) {
        handleError(error)
    }
}
