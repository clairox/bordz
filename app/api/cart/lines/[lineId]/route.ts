import handleError from '@/lib/errorHandling'
import { db } from '@/db'
import { CartLineItemTable, CartTable } from '@/schema/cart'
import { and, eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'
import {
    createBadRequestError,
    createInternalServerError,
    createNotFoundError,
    getCart,
    updateCheckout,
} from '@/app/api/shared'
import { CheckoutLineItemTable } from '@/schema/checkout'
import { CartLineRecord } from '@/types/records'

const deleteCartLine = async (id: string) => {
    const deletedCartLine = await db
        .delete(CartLineItemTable)
        .where(eq(CartLineItemTable.id, id))
        .returning()
        .then(rows => rows[0])

    if (!deletedCartLine) {
        throw createNotFoundError('Cart line')
    }

    return deletedCartLine
}

const updateCartWithDeletedCartLine = async (
    id: string,
    deletedCartLine: CartLineRecord
) => {
    const oldCart = await getCart(id)

    if (!oldCart) {
        throw createNotFoundError('Cart')
    }

    const updatedCart = await db
        .update(CartTable)
        .set({
            subtotal: oldCart.subtotal - deletedCartLine.subtotal,
            total: oldCart.total - deletedCartLine.total,
            totalQuantity: oldCart.totalQuantity - deletedCartLine.quantity,
            updatedAt: new Date(),
        })
        .where(eq(CartTable.id, id))
        .returning()
        .then(async rows => {
            const updatedCartId = rows[0].id
            return await getCart(updatedCartId)
        })

    if (!updatedCart) {
        throw createInternalServerError('Failed to update cart.')
    }

    return updatedCart
}

const deleteCheckoutLine = async (checkoutId: string, productId: string) => {
    await db
        .delete(CheckoutLineItemTable)
        .where(
            and(
                eq(CheckoutLineItemTable.checkoutId, checkoutId),
                eq(CheckoutLineItemTable.productId, productId)
            )
        )
}

export const DELETE = async (
    request: NextRequest,
    context: { params: { lineId: string } }
) => {
    const cartId = request.cookies.get('cartId')?.value
    if (!cartId) {
        return handleError(createBadRequestError('Missing cartId cookie.'))
    }

    const { lineId } = context.params

    try {
        const deletedCartLine = await deleteCartLine(lineId)
        const updatedCart = await updateCartWithDeletedCartLine(
            cartId,
            deletedCartLine
        )

        if (updatedCart.checkout) {
            const updatedCheckout = await updateCheckout(
                updatedCart.checkout.id,
                updatedCart
            )

            await deleteCheckoutLine(
                updatedCheckout.id,
                deletedCartLine.productId
            )
        }

        return NextResponse.json(updatedCart)
    } catch (error) {
        return handleError(error)
    }
}
