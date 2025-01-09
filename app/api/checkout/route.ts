import { NextRequest, NextResponse } from 'next/server'
import { serialize } from 'cookie'
import { eq } from 'drizzle-orm'

import {
    getCart,
    getCheckout,
    getRequiredRequestCookie,
    handleRoute,
} from '@/app/api/shared'
import { calculateTaxManually } from '@/utils/helpers'
import { db } from '@/drizzle/db'
import { CheckoutLineItemTable, CheckoutTable } from '@/drizzle/schema/checkout'
import { createInternalServerError, createNotFoundError } from '@/lib/errors'
import { DEFAULT_COOKIE_CONFIG, SHIPPING_COST } from '@/utils/constants'
import { CartQueryResult, CartQueryResultLine } from '@/types/queries'

export const GET = async (request: NextRequest) =>
    await handleRoute(async () => {
        const checkoutId = request.cookies.get('checkoutId')?.value
        const checkout = checkoutId ? await getCheckout(checkoutId) : undefined

        if (!checkout) {
            const { value: cartId } = getRequiredRequestCookie(
                request,
                'cartId'
            )

            const cart = await getCart(cartId)
            if (!cart) {
                throw createNotFoundError('Cart')
            }

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
    })

export const PATCH = async (request: NextRequest) =>
    await handleRoute(async () => {
        const { value: checkoutId } = getRequiredRequestCookie(
            request,
            'checkoutId'
        )
        const data = await request.json()

        const updatedCheckout = await db
            .update(CheckoutTable)
            .set({
                subtotal: data.subtotal,
                total: data.total,
                totalShipping: data.totalShipping,
                totalTax: data.totalTax,
                email: data.email,
                shippingAddressId: data.shippingAddressId,
                paymentIntentId: data.paymentIntentId,
                updatedAt: new Date(),
            })
            .where(eq(CheckoutTable.id, checkoutId))
            .returning()
            .then(async rows => await getCheckout(rows[0].id))

        if (!updatedCheckout) {
            throw createInternalServerError('Failed to update checkout.')
        }

        return NextResponse.json(updatedCheckout)
    })

const createCheckout = async (cart: CartQueryResult) => {
    const totalTax = calculateTaxManually(cart.total)

    const newCheckoutId = await db
        .insert(CheckoutTable)
        .values({
            subtotal: cart.subtotal,
            total: cart.total + totalTax + SHIPPING_COST,
            totalShipping: SHIPPING_COST,
            totalTax,
            cartId: cart.id,
            customerId: cart.ownerId,
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
    cartLines: CartQueryResultLine[]
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
