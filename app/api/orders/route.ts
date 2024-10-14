import { db } from '@/db'
import handleError from '@/lib/errorHandling'
import { toShortUUID } from '@/lib/uuidTranslator'
import { CheckoutTable } from '@/schema/checkout'
import { OrderLineItemTable, OrderTable } from '@/schema/order'
import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'
import { uuid } from 'short-uuid'

export const POST = async (request: NextRequest) => {
    const { checkoutId } = await request.json()

    if (!checkoutId) {
        return NextResponse.json(
            { message: 'checkoutId is undefined', code: 'BAD_REQUEST' },
            { status: 400 }
        )
    }

    try {
        // Confirm checkout exists
        const checkout = await db.query.CheckoutTable.findFirst({
            where: eq(CheckoutTable.id, checkoutId),
            with: {
                lines: {
                    with: {
                        product: true,
                    },
                },
            },
        })

        if (checkout == undefined) {
            return NextResponse.json(
                {
                    message: 'checkout not found',
                    code: 'NOT_FOUND',
                },
                { status: 404 }
            )
        }

        if (!checkout.email) {
            return NextResponse.json(
                {
                    message: 'checkout.email is not defined',
                    code: 'FAILED_DEPENDENCY',
                },
                { status: 424 }
            )
        }

        if (!checkout.shippingAddressId) {
            return NextResponse.json(
                {
                    message: 'checkout.shippingAddressId is not defined',
                    code: 'FAILED_DEPENDENCY',
                },
                { status: 424 }
            )
        }

        // Create order
        const order = await db
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
            .then(rows => rows[0])

        await db.insert(OrderLineItemTable).values(
            checkout.lines.map((line, idx) => {
                return {
                    title: line.product?.title ?? 'Item ' + idx,
                    total: line.unitPrice,
                    quantity: line.quantity,
                    productId: line.productId,
                    orderId: order.id,
                }
            })
        )

        // Update checkout.orderId
        await db
            .update(CheckoutTable)
            .set({ orderId: order.id, completedAt: new Date() })
            .where(eq(CheckoutTable.id, checkoutId))

        const newOrder = await db.query.OrderTable.findFirst({
            where: eq(OrderTable.id, order.id),
            with: {
                lines: {
                    with: {
                        product: true,
                    },
                },
            },
        })

        return NextResponse.json(newOrder)
    } catch (error) {
        handleError(error)
    }
}
