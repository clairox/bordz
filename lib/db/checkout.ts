'use server'

import { and, eq, inArray } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { CheckoutLines, Checkouts } from '@/drizzle/schema/checkout'
import {
    CreateCheckoutLineRecordArgs,
    CreateCheckoutRecordArgs,
    OrderRecord,
    UpdateCheckoutRecordArgs,
} from '@/types/database'
import { CheckoutLineQueryResult, CheckoutQueryResult } from '@/types/queries'
import { Products } from '@/drizzle/schema/product'
import {
    createConflictError,
    createInternalServerError,
    createNotFoundError,
    createUnprocessableEntityError,
} from '../errors'
import { SHIPPING_COST } from '@/utils/constants'
import { calculateTaxManually } from '@/utils/domain'
import { OrderLines, Orders } from '@/drizzle/schema/order'

export async function getCheckout(
    id: string
): Promise<CheckoutQueryResult | undefined> {
    return await db.query.Checkouts.findFirst({
        where: eq(Checkouts.id, id),
        with: checkoutWith,
    })
}

export async function createCheckout(
    values: CreateCheckoutRecordArgs
): Promise<CheckoutQueryResult> {
    const [newCheckout] = await db.insert(Checkouts).values(values).returning()
    const result = await db.query.Checkouts.findFirst({
        where: eq(Checkouts.id, newCheckout.id),
        with: checkoutWith,
    })

    return result!
}

export async function updateCheckout(
    id: string,
    values: UpdateCheckoutRecordArgs
): Promise<CheckoutQueryResult> {
    const [updatedCheckout] = await db
        .update(Checkouts)
        .set({ ...values, updatedAt: new Date() })
        .where(eq(Checkouts.id, id))
        .returning()

    const result = await db.query.Checkouts.findFirst({
        where: eq(Checkouts.id, updatedCheckout.id),
        with: checkoutWith,
    })
    return result!
}

export async function completeCheckout(
    id: string
): Promise<CheckoutQueryResult> {
    return await db.transaction(async tx => {
        const checkout = await tx.query.Checkouts.findFirst({
            where: eq(Checkouts.id, id),
            with: checkoutWith,
        })
        if (!checkout) {
            throw createNotFoundError('Checkout')
        } else if (!checkout.email) {
            throw createUnprocessableEntityError(
                "The 'email' field is missing on the checkout resource. This might be due to a prior API call."
            )
        }

        const [newOrder] = await tx
            .insert(Orders)
            .values({
                email: checkout.email,
                customerId: checkout.customerId,
                shippingAddressId: checkout.shippingAddressId,
                subtotal: checkout.subtotal,
                total: checkout.total,
                totalTax: checkout.totalTax,
                totalShipping: checkout.totalShipping,
            })
            .returning()

        const newOrderLines = await tx
            .insert(OrderLines)
            .values(
                checkout.lines.map((line, idx) => ({
                    orderId: newOrder.id,
                    productId: line.productId,
                    title: line.product?.title ?? `Item ${idx}`,
                    total: line.unitPrice * line.quantity,
                    quantity: line.quantity,
                }))
            )
            .returning()

        const unavailableItems = await tx.query.OrderLines.findMany({
            where: inArray(
                OrderLines.id,
                newOrderLines.map(line => line.id)
            ),
            with: {
                product: true,
            },
        }).then(rows =>
            rows.filter(row => !row.product || !row.product.availableForSale)
        )

        if (unavailableItems.length > 0) {
            throw createConflictError(
                `The following items are out of stock: ${unavailableItems.map(item => item.id)}`
            )
        }

        const now = new Date()
        const [completedCheckout] = await tx
            .update(Checkouts)
            .set({ orderId: newOrder.id, completedAt: now, updatedAt: now })
            .returning()

        const result = await tx.query.Checkouts.findFirst({
            where: eq(Checkouts.id, completedCheckout.id),
            with: checkoutWith,
        })

        return result!
    })
}

export async function createCheckoutLine(
    values: CreateCheckoutLineRecordArgs
): Promise<CheckoutLineQueryResult> {
    return await db.transaction(async tx => {
        const productWhere = and(
            eq(Products.id, values.productId),
            eq(Products.availableForSale, true)
        )
        const [product] = await tx.select().from(Products).where(productWhere)

        if (!product) {
            throw createNotFoundError('Product')
        }

        try {
            const [newCheckoutLine] = await tx
                .insert(CheckoutLines)
                .values({ ...values, unitPrice: product.price })
                .returning()

            const [checkout] = await tx
                .select()
                .from(Checkouts)
                .where(eq(Checkouts.id, newCheckoutLine.checkoutId))

            const newCheckoutLineTotal =
                newCheckoutLine.unitPrice * newCheckoutLine.quantity

            const subtotal = checkout.subtotal + newCheckoutLineTotal
            const totalTax = calculateTaxManually(subtotal)
            const totalShipping = SHIPPING_COST
            const total = subtotal + totalTax + totalShipping

            await tx
                .update(Checkouts)
                .set({
                    subtotal,
                    totalShipping,
                    totalTax,
                    total,
                    updatedAt: new Date(),
                })
                .where(eq(Checkouts.id, checkout.id))
                .returning()

            return {
                ...newCheckoutLine,
                product,
            }
        } catch (error) {
            if (
                (error as Error).message.includes('checkout_id_product_id_idx')
            ) {
                throw createConflictError('Checkout line')
            } else {
                throw createInternalServerError()
            }
        }
    })
}

export async function createCheckoutLines(
    values: CreateCheckoutLineRecordArgs[]
): Promise<CheckoutLineQueryResult[]> {
    const lines: CheckoutLineQueryResult[] = []
    for await (const valueSet of values) {
        const newLine = await createCheckoutLine(valueSet)
        lines.push(newLine)
    }
    return lines
}

type True = true
const checkoutWith = {
    lines: {
        with: {
            product: true as True,
        },
    },
}
