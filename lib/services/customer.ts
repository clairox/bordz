import * as db from 'db'
import { CustomerQueryResult } from '@/types/queries'
import { CreateCustomerValues, UpdateCustomerValues } from '@/types/services'
import { calculateNextPage, calculateTotalPages } from '@/utils/math'
import { PaginatedQueryOptions } from '@/types/api'
import { createNotFoundError } from '../errors'
import { CustomerRecord } from '@/types/database'
import {
    DEFAULT_PAGE_NUMBER,
    DEFAULT_PAGE_SIZE,
    DEFAULT_SORT_KEY,
} from '@/utils/constants'

export async function getCustomer(
    id: CustomerRecord['id']
): Promise<CustomerQueryResult> {
    const customer = await db.getCustomer(id)
    if (!customer) {
        throw createNotFoundError('Customer')
    }
    return customer
}

export async function getCustomerByUserId(
    userId: CustomerRecord['userId']
): Promise<CustomerQueryResult> {
    const customer = await db.getCustomerByUserId(userId)
    if (!customer) {
        throw createNotFoundError('Customer')
    }
    return customer
}

export async function createCustomer(
    values: CreateCustomerValues
): Promise<CustomerQueryResult> {
    return await db.createCustomer(values)
}

export async function updateCustomer(
    id: CustomerRecord['id'],
    values: UpdateCustomerValues
): Promise<CustomerQueryResult> {
    const updatedCustomer = await db.updateCustomer(id, values)
    if (!updatedCustomer) {
        throw createNotFoundError('Order')
    }
    return updatedCustomer
}

export async function updateCustomerByUserId(
    userId: CustomerRecord['userId'],
    values: UpdateCustomerValues
): Promise<CustomerQueryResult> {
    const updatedCustomer = await db.updateCustomer(userId, values)
    if (!updatedCustomer) {
        throw createNotFoundError('Order')
    }
    return updatedCustomer
}

export async function deleteCustomer(
    id: CustomerRecord['id']
): Promise<CustomerRecord['id']> {
    const deletedCustomerId = await db.deleteCustomer(id)
    if (!deletedCustomerId) {
        throw createNotFoundError('Order')
    }
    return deletedCustomerId
}

export async function deleteCustomerByUserId(
    userId: CustomerRecord['userId']
): Promise<CustomerRecord['id']> {
    const deletedCustomerId = await db.deleteCustomerByUserId(userId)
    if (!deletedCustomerId) {
        throw createNotFoundError('Order')
    }
    return deletedCustomerId
}

export async function deleteCustomers(
    ids: CustomerRecord['id'][]
): Promise<CustomerRecord['id'][]> {
    return await db.deleteCustomers(ids)
}

export async function getCustomers(
    options?: PaginatedQueryOptions
): Promise<Page<CustomerQueryResult>> {
    const page = options?.page ?? DEFAULT_PAGE_NUMBER
    const size = options?.size ?? DEFAULT_PAGE_SIZE
    const orderBy = options?.orderBy ?? DEFAULT_SORT_KEY

    const { customers, totalCount } = await db.getCustomers({
        limit: size,
        offset: (page - 1) * size,
        orderBy,
    })

    const totalPages = calculateTotalPages(size, totalCount)
    const nextPage = calculateNextPage(page, size, totalCount)
    return { data: customers, totalCount, totalPages, nextPage }
}
