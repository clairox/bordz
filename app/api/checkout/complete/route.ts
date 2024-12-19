import { NextRequest, NextResponse } from 'next/server'
import { serialize } from 'cookie'
import { eq } from 'drizzle-orm'

import { getCheckout } from '@/app/api/shared'
import { db } from '@/drizzle/db'
import { CartTable } from '@/drizzle/schema/cart'
import { CheckoutTable } from '@/drizzle/schema/checkout'
import { OrderLineItemTable, OrderTable } from '@/drizzle/schema/order'
import {
    createBadRequestError,
    createConflictError,
    createInternalServerError,
    handleError,
} from '@/lib/errors'
import { DEFAULT_COOKIE_CONFIG } from '@/utils/constants'

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
            throw createInternalServerError('An unexpected error occurred.')
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
                    productId: line.productId,
                    orderId: newOrderId,
                }
            })
        )
        .returning()
}

export const POST = async (request: NextRequest) => {
    const cartId = request.cookies.get('cartId')?.value
    const checkoutId = request.cookies.get('checkoutId')?.value

    if (!cartId || !checkoutId) {
        return handleError(createBadRequestError())
    }

    try {
        const checkout = await completeCheckout(checkoutId)

        // TODO: Include nulls in types or make new types
        // @ts-expect-error type shit
        const order = await createOrder(checkout)

        await db
            .update(CheckoutTable)
            .set({ orderId: order.id, updatedAt: new Date() })

        await db.delete(CartTable).where(eq(CartTable.id, cartId))

        const cartIdCookie = serialize('cartId', '', {
            ...DEFAULT_COOKIE_CONFIG,
            maxAge: -1,
        })
        const checkoutIdCookie = serialize('checkoutId', '', {
            ...DEFAULT_COOKIE_CONFIG,
            maxAge: -1,
        })

        const response = NextResponse.json(
            { orderId: order.id },
            { status: 200 }
        )
        response.headers.append('Set-Cookie', cartIdCookie)
        response.headers.append('Set-Cookie', checkoutIdCookie)

        return response
    } catch (error) {
        return handleError(error)
    }
}
