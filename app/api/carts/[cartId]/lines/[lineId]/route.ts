import handleError from '@/lib/errorHandling'
import { db } from '@/db'
import { CartLineItemTable, CartTable } from '@/schema/cart'
import { and, eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

export const DELETE = async (
    _: NextRequest,
    context: { params: { cartId: string; lineId: string } }
) => {
    const { cartId, lineId } = context.params

    try {
        // Delete cart line
        await db
            .delete(CartLineItemTable)
            .where(
                and(
                    eq(CartLineItemTable.cartId, cartId),
                    eq(CartLineItemTable.id, lineId)
                )
            )
            .returning()
            .then(rows => rows[0])

        // Get updated cart
        const updatedCart = await db.query.CartTable.findMany({
            where: eq(CartTable.id, cartId),
            with: {
                lines: true,
            },
        }).then(rows => rows[0])

        return NextResponse.json(updatedCart)
    } catch (error) {
        return handleError(error as Error)
    }
}
