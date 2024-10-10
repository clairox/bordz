import handleError from '@/lib/errorHandling'
import { db } from '@/db'
import { CartTable } from '@/schema/cart'
import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (
    _: NextRequest,
    context: { params: { cartId: string } }
) => {
    const { cartId } = context.params

    try {
        // Get cart
        const cart = await db.query.CartTable.findFirst({
            where: eq(CartTable.id, cartId),
            with: {
                lines: {
                    with: {
                        product: true,
                    },
                },
            },
        })

        if (cart == undefined) {
            return NextResponse.json(
                { error: { message: 'Cart not found', code: 'NOT_FOUND' } },
                { status: 404 }
            )
        }

        return NextResponse.json(cart)
    } catch (error) {
        return handleError(error as Error)
    }
}
