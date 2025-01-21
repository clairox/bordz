import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'

import {
    getCart,
    getProduct,
    getRequiredRequestCookie,
    handleRoute,
    updateCheckout,
    validateRequestBody,
} from '@/app/api/shared'
import { db } from '@/drizzle/db'
import { CartLineItemTable, CartTable } from '@/drizzle/schema/cart'
import { CheckoutLineItemTable } from '@/drizzle/schema/checkout'
import { CartLineRecord, ProductRecord } from '@/types/database'
import {
    createConflictError,
    createInternalServerError,
    createNotFoundError,
} from '@/lib/errors'
import { UNEXPECTED_ERROR_TEXT } from '@/utils/constants'

export const POST = async (request: NextRequest) =>
    await handleRoute(async () => {
        const { value: cartId } = getRequiredRequestCookie(request, 'cartId')
        const data = await request.json()
        validateRequestBody(data, ['productId', 'quantity'])

        const product = await getProduct(data.productId)
        if (!product) {
            throw createNotFoundError('Product')
        }

        const newCartLine = await createCartLine(product, data.quantity, cartId)
        const updatedCart = await updateCartWithNewCartLine(cartId, newCartLine)

        if (updatedCart.checkout) {
            const updatedCheckout = await updateCheckout(
                updatedCart.checkout.id,
                updatedCart
            )

            await createCheckoutLine(newCartLine, product, updatedCheckout.id)
        }

        return NextResponse.json(updatedCart)
    })

export const DELETE = async (request: NextRequest) =>
    await handleRoute(async () => {
        const { value: cartId } = getRequiredRequestCookie(request, 'cartId')

        const oldCart = await getCart(cartId)
        if (!oldCart) {
            throw createNotFoundError('Cart')
        }

        await db
            .delete(CartLineItemTable)
            .where(eq(CartLineItemTable.cartId, oldCart.id))

        const updatedCart = await db
            .update(CartTable)
            .set({
                subtotal: 0,
                total: 0,
                totalQuantity: 0,
                updatedAt: new Date(),
            })
            .where(eq(CartTable.id, cartId))

        if (!updatedCart) {
            throw createInternalServerError('Failed to update cart.')
        }

        return NextResponse.json(updatedCart)
    })

const createCartLine = async (
    product: ProductRecord,
    quantity: number,
    cartId: string
) => {
    try {
        const newCartLine = await db
            .insert(CartLineItemTable)
            .values({
                subtotal: product.price,
                total: product.price,
                quantity: quantity,
                productId: product.id,
                cartId: cartId,
            })
            .returning()
            .then(async rows => {
                const id = rows[0].id
                return await db.query.CartLineItemTable.findFirst({
                    where: eq(CartLineItemTable.id, id),
                    with: {
                        product: true,
                    },
                })
            })

        if (!newCartLine) {
            throw createInternalServerError('Failed to create cart line.')
        }

        return newCartLine
    } catch (error) {
        if ((error as Error).message.includes('cart_id_product_id_idx')) {
            throw createConflictError('Cart line')
        } else {
            throw createInternalServerError(UNEXPECTED_ERROR_TEXT)
        }
    }
}

const updateCartWithNewCartLine = async (
    id: string,
    newCartLine: CartLineRecord
) => {
    const oldCart = await getCart(id)

    if (!oldCart) {
        throw createNotFoundError('Cart')
    }

    const updatedCart = await db
        .update(CartTable)
        .set({
            subtotal: oldCart.subtotal + newCartLine.subtotal,
            total: oldCart.total + newCartLine.total,
            totalQuantity: oldCart.totalQuantity + newCartLine.quantity,
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

const createCheckoutLine = async (
    cartLine: CartLineRecord,
    product: ProductRecord,
    checkoutId: string
) => {
    try {
        const newCheckoutLine = await db
            .insert(CheckoutLineItemTable)
            .values({
                unitPrice: product.price,
                quantity: cartLine.quantity,
                productId: cartLine.productId,
                checkoutId,
            })
            .returning()
            .then(async rows => {
                const id = rows[0].id
                return await db.query.CheckoutLineItemTable.findFirst({
                    where: eq(CheckoutLineItemTable.id, id),
                })
            })

        if (!newCheckoutLine) {
            throw createInternalServerError('Failed to create checkout line.')
        }

        return newCheckoutLine
    } catch (error) {
        if ((error as Error).message.includes('checkout_id_product_id_idx')) {
            throw createConflictError('Checkout line')
        } else {
            throw createInternalServerError(UNEXPECTED_ERROR_TEXT)
        }
    }
}
