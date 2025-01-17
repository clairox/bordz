import { NextRequest, NextResponse } from 'next/server'
import { and, eq } from 'drizzle-orm'

import {
    getCart,
    getRequiredRequestCookie,
    handleRoute,
    updateCheckout,
} from '@/app/api/shared'
import { db } from '@/drizzle/db'
import { CartLineItemTable, CartTable } from '@/drizzle/schema/cart'
import { CheckoutLineItemTable } from '@/drizzle/schema/checkout'
import { CartLineRecord } from '@/types/database'
import { createInternalServerError, createNotFoundError } from '@/lib/errors'
import { DynamicRoutePropsWithParams } from '@/types/api'

type Props = DynamicRoutePropsWithParams<{ lineId: string }>

export const GET = async (_: NextRequest, { params: { lineId } }: Props) =>
    await handleRoute(async () => {
        const cartLine = await db.query.CartLineItemTable.findFirst({
            where: eq(CartLineItemTable.id, lineId),
            with: {
                product: {
                    with: {
                        boardSetup: true,
                    },
                },
            },
        })

        if (!cartLine) {
            throw createNotFoundError('Cart line')
        }

        return NextResponse.json(cartLine)
    })

export const DELETE = async (
    request: NextRequest,
    { params: { lineId } }: Props
) =>
    await handleRoute(async () => {
        const { value: cartId } = getRequiredRequestCookie(request, 'cartId')

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
    })

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
