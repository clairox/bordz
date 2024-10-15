import { NextRequest, NextResponse } from 'next/server'
import {
    createBadRequestError,
    createInternalServerError,
    getCheckout,
} from '../../shared'
import handleError from '@/lib/errorHandling'
import { db } from '@/drizzle/db'
import { CartTable } from '@/drizzle/schema/cart'
import { eq } from 'drizzle-orm'
import { serialize, SerializeOptions } from 'cookie'
import { CheckoutTable } from '@/drizzle/schema/checkout'
import { OrderLineItemTable, OrderTable } from '@/drizzle/schema/order'

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

    const newOrderId = await db
        .insert(OrderTable)
        .values({
            email: checkout.email,
            subtotal: checkout.subtotal,
            total: checkout.total,
            totalTax: checkout.totalTax,
            totalShipping: checkout.totalShipping,
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

        await db.update(CheckoutTable).set({ orderId: order.id })

        await db.delete(CartTable).where(eq(CartTable.id, cartId))

        const cookieDeletionConfig = {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: -1,
            sameSite: 'strict' as SerializeOptions['sameSite'],
            path: '/',
        }

        const cartIdCookie = serialize('cartId', '', cookieDeletionConfig)
        const checkoutIdCookie = serialize(
            'checkoutId',
            '',
            cookieDeletionConfig
        )

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
