import * as db from 'db'
import { OrderRecord } from '@/types/database'
import { OrderQueryResult } from '@/types/queries'
import { createNotFoundError } from '../errors'
import { CreateOrderValues, UpdateOrderValues } from '@/types/services'
import { calculateNextPage, calculateTotalPages } from '@/utils/math'
import {
    DEFAULT_PAGE_NUMBER,
    DEFAULT_PAGE_SIZE,
    DEFAULT_SORT_KEY,
} from '@/utils/constants'
import { PaginatedQueryOptions } from '@/types/api'

export async function getOrder(
    id: OrderRecord['id']
): Promise<OrderQueryResult | undefined> {
    const order = await db.getOrder(id)
    if (!order) {
        throw createNotFoundError('Order')
    }
    return order
}

export async function createOrder(
    values: CreateOrderValues
): Promise<OrderQueryResult> {
    return await db.createOrder(values)
}

export async function updateOrder(
    id: OrderRecord['id'],
    values: UpdateOrderValues
): Promise<OrderQueryResult> {
    const updatedOrder = await db.updateOrder(id, values)
    if (!updatedOrder) {
        throw createNotFoundError('Order')
    }
    return updatedOrder
}

export async function deleteOrder(id: OrderRecord['id']): Promise<string> {
    const deletedOrder = await db.deleteOrder(id)
    if (!deletedOrder) {
        throw createNotFoundError('Order')
    }
    return deletedOrder
}

export async function getOrders(
    options?: PaginatedQueryOptions & { customerId?: string }
): Promise<Page<OrderQueryResult>> {
    const page = options?.page ?? DEFAULT_PAGE_NUMBER
    const size = options?.size ?? DEFAULT_PAGE_SIZE
    const orderBy = options?.orderBy ?? DEFAULT_SORT_KEY

    const { orders, totalCount } = await db.getOrders({
        customerId: options?.customerId,
        limit: size,
        offset: (page - 1) * size,
        orderBy,
    })

    const totalPages = calculateTotalPages(size, totalCount)
    const nextPage = calculateNextPage(page, size, totalCount)
    return { data: orders, totalCount, totalPages, nextPage }
}

export async function deleteOrders(
    ids: OrderRecord['id'][]
): Promise<OrderRecord['id'][]> {
    return await db.deleteOrders(ids)
}
