import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'

import {
    createBadRequestError,
    createInternalServerError,
    createNotFoundError,
    getCart,
    updateCheckout,
} from '@/app/api/shared'
import { db } from '@/drizzle/db'
import handleError from '@/lib/errorHandling'
import { CartLineItemTable, CartTable } from '@/drizzle/schema/cart'
import { ProductTable } from '@/drizzle/schema/product'
import { CheckoutLineItemTable } from '@/drizzle/schema/checkout'
import { CartLineRecord, ProductRecord } from '@/types/records'

const getProduct = async (id: string) => {
    return await db.query.ProductTable.findFirst({
        where: eq(ProductTable.id, id),
    })
}

const createCartLine = async (
    product: ProductRecord,
    quantity: number,
    cartId: string
) => {
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
}

export const POST = async (request: NextRequest) => {
    const cartId = request.cookies.get('cartId')?.value
    if (!cartId) {
        return handleError(createBadRequestError('Missing cartId cookie.'))
    }

    const { productId, quantity } = await request.json()

    if (!productId || !quantity) {
        throw createBadRequestError()
    }

    try {
        const product = await getProduct(productId)
        if (!product) {
            throw createNotFoundError('Product')
        }

        const newCartLine = await createCartLine(product, quantity, cartId)
        const updatedCart = await updateCartWithNewCartLine(cartId, newCartLine)

        if (updatedCart.checkout) {
            const updatedCheckout = await updateCheckout(
                updatedCart.checkout.id,
                updatedCart
            )

            await createCheckoutLine(newCartLine, product, updatedCheckout.id)
        }

        return NextResponse.json(updatedCart)
    } catch (error) {
        return handleError(error)
    }
}

export const DELETE = async (request: NextRequest) => {
    const cartId = request.cookies.get('cartId')?.value
    if (!cartId) {
        return handleError(createBadRequestError('Missing cartId cookie.'))
    }

    try {
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
    } catch (error) {
        return handleError(error)
    }
}
