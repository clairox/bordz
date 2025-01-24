import { PaginatedQueryOptions } from '@/types/api'
import { ProductQueryResult } from '@/types/queries'
import { calculateNextPage, calculateTotalPages } from '@/utils/math'
import {
    DEFAULT_PAGE_NUMBER,
    DEFAULT_PAGE_SIZE,
    DEFAULT_SORT_KEY,
} from '@/utils/constants'
import * as db from 'db/product'
import { CreateProductValues, UpdateProductValues } from '@/types/services'
import { ProductRecord } from '@/types/database'
import { createNotFoundError } from '../errors'

export async function getProduct(
    id: ProductRecord['id']
): Promise<ProductQueryResult> {
    const product = await db.getProduct(id)
    if (!product) {
        throw createNotFoundError('Product')
    }
    return product
}

export async function createProduct(
    values: CreateProductValues
): Promise<ProductQueryResult> {
    return await db.createProduct(values)
}

export async function updateProduct(
    id: ProductRecord['id'],
    values: UpdateProductValues
): Promise<ProductQueryResult> {
    return await db.updateProduct(id, values)
}

export async function deleteProduct(id: string): Promise<string> {
    return await db.deleteProduct(id)
}

export async function getProducts(
    publicOnly: boolean = false,
    options?: PaginatedQueryOptions
): Promise<Page<ProductQueryResult>> {
    const page = options?.page ?? DEFAULT_PAGE_NUMBER
    const size = options?.size ?? DEFAULT_PAGE_SIZE
    const orderBy = options?.orderBy ?? DEFAULT_SORT_KEY

    const { products, totalCount } = await db.getProducts({
        publicOnly,
        limit: size,
        offset: (page - 1) * size,
        orderBy,
    })

    const totalPages = calculateTotalPages(size, totalCount)
    const nextPage = calculateNextPage(page, size, totalCount)
    return { data: products, totalCount, totalPages, nextPage }
}

export async function deleteProducts(
    ids: ProductRecord['id'][]
): Promise<string[]> {
    return await db.deleteProducts(ids)
}
