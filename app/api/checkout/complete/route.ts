import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'

import {
    getCheckout,
    getRequiredRequestCookie,
    handleRoute,
} from '@/app/api/shared'
import { db } from '@/drizzle/db'
import { CartTable } from '@/drizzle/schema/cart'
import { CheckoutTable } from '@/drizzle/schema/checkout'
import { OrderLineItemTable, OrderTable } from '@/drizzle/schema/order'
import { createConflictError, createInternalServerError } from '@/lib/errors'
import { UNEXPECTED_ERROR_TEXT } from '@/utils/constants'
import { expireCookies } from '@/utils/session/expireCookie'

export const POST = async (request: NextRequest) =>
    await handleRoute(async () => {
        const { value: cartId } = getRequiredRequestCookie(request, 'cartId')
        const { value: checkoutId } = getRequiredRequestCookie(
            request,
            'checkoutId'
        )

        const checkout = await completeCheckout(checkoutId)

        // TODO: Include nulls in types or make new types
        // @ts-expect-error type shit
        const order = await createOrder(checkout)

        await db
            .update(CheckoutTable)
            .set({ orderId: order.id, updatedAt: new Date() })

        await db.delete(CartTable).where(eq(CartTable.id, cartId))

        let response = NextResponse.json({ orderId: order.id }, { status: 200 })

        response = expireCookies(['cartId', 'checkoutId'], response)
        return response
    })

const completeCheckout = async (id: string) => {
    const completedCheckout = await db
        .update(CheckoutTable)
        .set({ completedAt: new Date(), updatedAt: new Date() })
        .where(eq(CheckoutTable.id, id))
        .returning()
        .then(async rows => await getCheckout(rows[0].id))

    if (!completedCheckout) {
        throw createInternalServerError('Failed to update checkout.')
    }

    return completedCheckout
}

const createOrder = async (checkout: Checkout) => {
    if (!checkout.email) {
        throw createInternalServerError(
            'Checkout does not contain a valid email.'
        )
    }

    try {
        const newOrderId = await db
            .insert(OrderTable)
            .values({
                email: checkout.email,
                subtotal: checkout.subtotal,
                total: checkout.total,
                totalTax: checkout.totalTax,
                totalShipping: checkout.totalShipping,
                customerId: checkout.customerId,
                shippingAddressId: checkout.shippingAddressId,
            })
            .returning()
            .then(rows => rows[0].id)

        await createOrderLines(newOrderId, checkout.lines)

        const newOrder = await db.query.OrderTable.findFirst({
            where: eq(OrderTable.id, newOrderId),
            with: {
                lines: {
                    with: {
                        product: true,
                    },
                },
            },
        })

        if (!newOrder) {
            throw createInternalServerError('Failed to create order.')
        }

        return newOrder
    } catch (error) {
        if ((error as Error).message.includes('order_id_product_id_idx')) {
            throw createConflictError('Order line')
        } else {
            throw createInternalServerError(UNEXPECTED_ERROR_TEXT)
        }
    }
}

const createOrderLines = async (
    newOrderId: string,
    checkoutLines: CheckoutLine[]
) => {
    return await db
        .insert(OrderLineItemTable)
        .values(
            checkoutLines.map((line, idx) => {
                return {
                    title: line.product?.title ?? 'Item ' + idx,
                    total: line.unitPrice * line.quantity,
                    quantity: line.quantity,
                    productId: line.product?.id,
                    orderId: newOrderId,
                }
            })
        )
        .returning()
}
