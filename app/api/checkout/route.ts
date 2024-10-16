import { NextRequest, NextResponse } from 'next/server'
import { serialize } from 'cookie'
import { eq } from 'drizzle-orm'

import { getCart, getCheckout } from '@/app/api/shared'
import { calculateTaxManually } from '@/utils/helpers'
import { db } from '@/drizzle/db'
import { CheckoutLineItemTable, CheckoutTable } from '@/drizzle/schema/checkout'
import {
    createBadRequestError,
    createInternalServerError,
    createNotFoundError,
    handleError,
} from '@/lib/errors'
import { DEFAULT_COOKIE_CONFIG, SHIPPING_COST } from '@/utils/constants'

const createCheckout = async (cart: Cart) => {
    const totalTax = calculateTaxManually(cart.total)

    const newCheckoutId = await db
        .insert(CheckoutTable)
        .values({
            subtotal: cart.subtotal,
            total: cart.total + totalTax + SHIPPING_COST,
            totalShipping: SHIPPING_COST,
            totalTax,
            cartId: cart.id,
        })
        .returning()
        .then(rows => rows[0].id)

    await createCheckoutLines(newCheckoutId, cart.lines)

    const newCheckout = await getCheckout(newCheckoutId)
    if (!newCheckout) {
        throw createInternalServerError('Failed to create checkout.')
    }

    return newCheckout
}

const createCheckoutLines = async (
    newCheckoutId: string,
    cartLines: CartLine[]
) => {
    return await db
        .insert(CheckoutLineItemTable)
        .values(
            cartLines.map(line => {
                return {
                    unitPrice: line.product.price,
                    quantity: line.quantity,
                    productId: line.productId,
                    checkoutId: newCheckoutId,
                }
            })
        )
        .returning()
}

export const GET = async (request: NextRequest) => {
    const checkoutId = request.cookies.get('checkoutId')?.value
    const cartId = request.cookies.get('cartId')?.value

    try {
        const checkout = checkoutId ? await getCheckout(checkoutId) : undefined

        if (!checkout) {
            if (!cartId) {
                throw createBadRequestError('Missing cartId cookie.')
            }

            const cart = await getCart(cartId)
            if (!cart) {
                throw createNotFoundError('Cart')
            }

            // @ts-expect-error weird type shit
            const newCheckout = await createCheckout(cart)

            const cookie = serialize('checkoutId', newCheckout.id, {
                ...DEFAULT_COOKIE_CONFIG,
                maxAge: 60 * 60 * 24,
            })

            const response = NextResponse.json(newCheckout)
            response.headers.append('Set-Cookie', cookie)

            return response
        }

        return NextResponse.json(checkout)
    } catch (error) {
        handleError(error)
    }
}

export const PATCH = async (request: NextRequest) => {
    const values = await request.json()
    const checkoutId = request.cookies.get('checkoutId')?.value
    if (!checkoutId) {
        return handleError(createBadRequestError('Missing checkoutId cookie.'))
    }

    try {
        const updatedCheckout = await db
            .update(CheckoutTable)
            .set({ ...values, updatedAt: new Date() })
            .where(eq(CheckoutTable.id, checkoutId))
            .returning()
            .then(async rows => await getCheckout(rows[0].id))

        if (!updatedCheckout) {
            throw createInternalServerError('Failed to update checkout.')
        }

        return NextResponse.json(updatedCheckout)
    } catch (error) {
        handleError(error as Error)
    }
}
