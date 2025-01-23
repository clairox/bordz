'use server'

import { and, eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { CartLines, Carts } from '@/drizzle/schema/cart'
import { CartLineQueryResult, CartQueryResult } from '@/types/queries'
import {
    CreateCartLineRecordArgs,
    CreateCartRecordArgs,
    UpdateCartRecordArgs,
} from '@/types/database'
import { Products } from '@/drizzle/schema/product'
import {
    createConflictError,
    createInternalServerError,
    createNotFoundError,
} from '../errors'
import { CheckoutLines, Checkouts } from '@/drizzle/schema/checkout'
import { calculateTaxManually } from '@/utils/domain'
import { SHIPPING_COST } from '@/utils/constants'

/* Cart */

export async function getCart(
    id: string
): Promise<CartQueryResult | undefined> {
    return await db.query.Carts.findFirst({
        where: eq(Carts.id, id),
        with: cartWith,
    })
}

export async function getCartByOwnerId(
    ownerId: string
): Promise<CartQueryResult | undefined> {
    return await db.query.Carts.findFirst({
        where: eq(Carts.ownerId, ownerId),
        with: cartWith,
    })
}

export async function createCart(
    values: CreateCartRecordArgs = {}
): Promise<CartQueryResult> {
    return await db
        .insert(Carts)
        .values(values)
        .returning()
        .then(rows => ({
            ...rows[0],
            lines: [] as CartLineQueryResult[],
            checkout: null,
        }))
}

export async function updateCart(
    id: string,
    values: UpdateCartRecordArgs
): Promise<CartQueryResult> {
    const [updatedCart] = await db
        .update(Carts)
        .set({
            ...values,
            updatedAt: new Date(),
        })
        .where(eq(Carts.id, id))
        .returning()

    const result = await db.query.Carts.findFirst({
        where: eq(Carts.id, updatedCart.id),
        with: cartWith,
    })

    return result!
}

export async function deleteCart(id: string): Promise<string | undefined> {
    return await db
        .delete(Carts)
        .where(eq(Carts.id, id))
        .returning({ id: Carts.id })
        .then(rows => rows[0].id)
}

/* Cart Lines */

export async function getCartLine(
    id: string
): Promise<CartLineQueryResult | undefined> {
    return await db.query.CartLines.findFirst({
        where: eq(CartLines.id, id),
        with: {
            product: true,
        },
    })
}

export async function createCartLine(
    values: CreateCartLineRecordArgs
): Promise<CartLineQueryResult> {
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
            const subtotal = product.price * (values.quantity ?? 1)
            const [newCartLine] = await tx
                .insert(CartLines)
                .values({ ...values, subtotal, total: subtotal })
                .returning()

            const [cart] = await tx
                .select()
                .from(Carts)
                .where(eq(Carts.id, newCartLine.cartId))

            const [updatedCart] = await tx
                .update(Carts)
                .set({
                    subtotal: cart.subtotal + newCartLine.subtotal,
                    total: cart.total + newCartLine.total,
                    totalQuantity: cart.totalQuantity + newCartLine.quantity,
                    updatedAt: new Date(),
                })
                .where(eq(Carts.id, cart.id))
                .returning()

            const [checkout] = await tx
                .select()
                .from(Checkouts)
                .where(eq(Checkouts.cartId, updatedCart.id))

            if (checkout) {
                const [newCheckoutLine] = await tx
                    .insert(CheckoutLines)
                    .values({
                        checkoutId: checkout.id,
                        productId: product.id,
                        unitPrice: product.price,
                        quantity: values.quantity,
                    })
                    .returning()

                const newCheckoutLineTotal =
                    newCheckoutLine.unitPrice * newCheckoutLine.quantity

                const subtotal = checkout.subtotal + newCheckoutLineTotal
                const totalTax = calculateTaxManually(subtotal)
                const totalShipping = SHIPPING_COST
                const total = subtotal + totalTax + totalShipping

                await tx.update(Checkouts).set({
                    subtotal,
                    totalTax,
                    totalShipping,
                    total,
                    updatedAt: new Date(),
                })
            }

            return {
                ...newCartLine,
                product,
            }
        } catch (error) {
            if ((error as Error).message.includes('cart_id_product_id_idx')) {
                throw createConflictError('Cart line')
            } else if (
                (error as Error).message.includes('checkout_id_product_id_idx')
            ) {
                throw createConflictError('Checkout line')
            } else {
                throw createInternalServerError()
            }
        }
    })
}

export async function deleteCartLine(id: string): Promise<string> {
    return await db.transaction(async tx => {
        const [deletedCartLine] = await tx
            .delete(CartLines)
            .where(eq(CartLines.id, id))
            .returning()

        if (!deletedCartLine) {
            throw createNotFoundError('Cart Line')
        }

        const [cart] = await tx
            .select()
            .from(Carts)
            .where(eq(Carts.id, deletedCartLine.cartId))

        const [updatedCart] = await tx
            .update(Carts)
            .set({
                subtotal: cart.subtotal - deletedCartLine.subtotal,
                total: cart.total - deletedCartLine.total,
                totalQuantity: cart.totalQuantity - deletedCartLine.quantity,
                updatedAt: new Date(),
            })
            .where(eq(Carts.id, cart.id))
            .returning()

        const [checkout] = await tx
            .select()
            .from(Checkouts)
            .where(eq(Checkouts.cartId, updatedCart.id))

        if (checkout) {
            const [deletedCheckoutLine] = await tx
                .delete(CheckoutLines)
                .where(eq(CheckoutLines.productId, deletedCartLine.productId))
                .returning()

            const deletedCheckoutLineTotal =
                deletedCheckoutLine.unitPrice * deletedCheckoutLine.quantity

            const subtotal = checkout.subtotal - deletedCheckoutLineTotal
            const totalTax = calculateTaxManually(subtotal)
            const totalShipping = SHIPPING_COST
            const total = subtotal + totalTax + totalShipping

            await tx.update(Checkouts).set({
                subtotal,
                totalTax,
                totalShipping,
                total,
                updatedAt: new Date(),
            })
        }

        return deletedCartLine.id
    })
}

export async function getCartLinesByCartId(
    cartId: string
): Promise<CartLineQueryResult[]> {
    return await db.query.CartLines.findMany({
        where: eq(CartLines.cartId, cartId),
        with: {
            product: true,
        },
    })
}

export async function createCartLines(
    values: CreateCartLineRecordArgs[]
): Promise<CartLineQueryResult[]> {
    const lines: CartLineQueryResult[] = []
    for await (const valueSet of values) {
        const newLine = await createCartLine(valueSet)
        lines.push(newLine)
    }

    return lines
}

export async function deleteCartLines(ids: string[]): Promise<string[]> {
    const deletedLines: string[] = []
    for await (const id of ids) {
        const deletedLineId = await deleteCartLine(id)
        deletedLines.push(deletedLineId)
    }

    return deletedLines
}

type True = true
const cartWith = {
    lines: {
        with: {
            product: true as True,
        },
    },
    checkout: true as True,
}
