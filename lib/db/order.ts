'use server'

import { and, asc, desc, eq, inArray, sql, SQL } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { Orders } from '@/drizzle/schema/order'
import {
    CreateOrderRecordArgs,
    OrderRecord,
    UpdateOrderRecordArgs,
} from '@/types/database'
import { OrderQueryResult } from '@/types/queries'
import { SortKey } from '@/types/sorting'
import { DEFAULT_SORT_KEY } from '@/utils/constants'

export async function getOrder(
    id: OrderRecord['id']
): Promise<OrderQueryResult | undefined> {
    return await db.query.Orders.findFirst({
        where: eq(Orders.id, id),
        with: orderWith,
    })
}

export async function createOrder(
    values: CreateOrderRecordArgs
): Promise<OrderQueryResult> {
    const [newOrder] = await db
        .insert(Orders)
        .values({ ...values })
        .returning()
    const result = await db.query.Orders.findFirst({
        where: eq(Orders.id, newOrder.id),
        with: orderWith,
    })

    return result!
}

export async function updateOrder(
    id: OrderRecord['id'],
    values: UpdateOrderRecordArgs
): Promise<OrderQueryResult> {
    const shipping = values.totalShipping ?? Orders.totalShipping
    const tax = values.totalTax ?? Orders.totalTax
    const total = sql`${Orders.subtotal} + ${shipping} + ${tax}`
    const [updatedOrder] = await db
        .update(Orders)
        .set({ ...values, total, updatedAt: new Date() })
        .where(eq(Orders.id, id))
        .returning()
    const result = await db.query.Orders.findFirst({
        where: eq(Orders.id, updatedOrder.id),
        with: orderWith,
    })

    return result!
}

export async function deleteOrder(id: OrderRecord['id']): Promise<string> {
    const [{ id: deletedOrderId }] = await db
        .delete(Orders)
        .where(eq(Orders.id, id))
        .returning({ id: Orders.id })
    return deletedOrderId
}

export async function getOrders(options?: {
    customerId?: OrderRecord['customerId']
    limit?: number
    offset?: number
    orderBy?: SortKey
}): Promise<{ orders: OrderQueryResult[]; totalCount: number }> {
    const conditions: (SQL | undefined)[] = []
    if (options?.customerId) {
        conditions.push(eq(Orders.customerId, options.customerId))
    }

    const sorts: Partial<Record<SortKey, SQL>> = {
        'date-desc': desc(Orders.createdAt),
        'date-asc': asc(Orders.createdAt),
        'price-desc': desc(Orders.total),
        'price-asc': asc(Orders.total),
    }

    const orderBy = sorts[options?.orderBy ?? DEFAULT_SORT_KEY]

    const orders = await db.query.Orders.findMany({
        where: and(...conditions),
        with: orderWith,
        limit: options?.limit,
        offset: options?.offset,
        orderBy,
    })

    const totalCount = await db.$count(Orders, and(...conditions))

    return { orders, totalCount }
}

export async function deleteOrders(
    ids: OrderRecord['id'][]
): Promise<OrderRecord['id'][]> {
    const deletedOrders = await db
        .delete(Orders)
        .where(inArray(Orders.id, ids))
        .returning({ id: Orders.id })
    return deletedOrders.map(order => order.id)
}

type True = true
const orderWith = {
    lines: {
        with: {
            product: true as True,
        },
    },
    customer: true as True,
    shippingAddress: true as True,
}
