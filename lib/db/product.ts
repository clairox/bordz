import { and, asc, desc, eq, inArray, SQL } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { Products } from '@/drizzle/schema/product'
import {
    CreateProductRecordArgs,
    ProductRecord,
    UpdateProductRecordArgs,
} from '@/types/database'
import { ProductQueryResult } from '@/types/queries'
import { SortKey } from '@/types/sorting'
import { DEFAULT_SORT_KEY } from '@/utils/constants'

export async function getProduct(
    id: ProductRecord['id']
): Promise<ProductQueryResult | undefined> {
    return await db.query.Products.findFirst({
        where: eq(Products.id, id),
    })
}

export async function createProduct(
    values: CreateProductRecordArgs
): Promise<ProductQueryResult> {
    const [newProduct] = await db
        .insert(Products)
        .values({ ...values, productType: values.type })
        .returning()
    return newProduct
}

export async function updateProduct(
    id: ProductRecord['id'],
    values: UpdateProductRecordArgs
): Promise<ProductQueryResult> {
    const [updatedProduct] = await db
        .update(Products)
        .set({ ...values, updatedAt: new Date() })
        .where(eq(Products.id, id))
        .returning()
    return updatedProduct
}

export async function deleteProduct(id: ProductRecord['id']): Promise<string> {
    const [{ id: deletedProductId }] = await db
        .delete(Products)
        .where(eq(Products.id, id))
        .returning({ id: Products.id })
    return deletedProductId
}

export async function getProducts(options?: {
    publicOnly?: boolean
    limit?: number
    offset?: number
    orderBy?: SortKey
}): Promise<{ products: ProductQueryResult[]; totalCount: number }> {
    const conditions: (SQL | undefined)[] = []
    if (options?.publicOnly) {
        conditions.push(eq(Products.isPublic, true))
    }

    const sorts: Partial<Record<SortKey, SQL>> = {
        'date-desc': desc(Products.createdAt),
        'date-asc': asc(Products.createdAt),
        'price-desc': desc(Products.price),
        'price-asc': asc(Products.price),
        'alpha-desc': desc(Products.title),
        'alpha-asc': asc(Products.title),
    }

    const orderBy = sorts[options?.orderBy ?? DEFAULT_SORT_KEY]

    const products = await db.query.Products.findMany({
        where: and(...conditions),
        limit: options?.limit,
        offset: options?.offset,
        orderBy,
    })

    const totalCount = await db.$count(Products, and(...conditions))

    return { products, totalCount }
}

// TODO: Update this and all many deletion db functions to use single query
export async function deleteProducts(
    ids: ProductRecord['id'][]
): Promise<string[]> {
    const deletedProducts = await db
        .delete(Products)
        .where(inArray(Products.id, ids))
        .returning({ id: Products.id })

    return deletedProducts.map(product => product.id)
}
