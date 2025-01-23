'use server'

import { and, count, eq, SQL } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { WishlistItems, Wishlists } from '@/drizzle/schema/wishlist'
import { WishlistLineQueryResult, WishlistQueryResult } from '@/types/queries'
import {
    CreateWishlistItemRecordArgs,
    CreateWishlistRecordArgs,
} from '@/types/database'
import { Products } from '@/drizzle/schema/product'
import {
    createConflictError,
    createInternalServerError,
    createNotFoundError,
} from '../errors'

/* Wishlist */

export async function getWishlist(
    id: string
): Promise<WishlistQueryResult | undefined> {
    return await db.query.Wishlists.findFirst({
        where: eq(Wishlists.id, id),
        with: wishlistWith,
    })
}

export async function getWishlistByOwnerId(
    ownerId: string
): Promise<WishlistQueryResult | undefined> {
    return await db.query.Wishlists.findFirst({
        where: eq(Wishlists.ownerId, ownerId),
        with: wishlistWith,
    })
}

export async function createWishlist(
    values: CreateWishlistRecordArgs = {}
): Promise<WishlistQueryResult> {
    return await db
        .insert(Wishlists)
        .values(values)
        .returning()
        .then(rows => ({
            ...rows[0],
            items: [] as WishlistLineQueryResult[],
        }))
}

export async function deleteWishlist(id: string): Promise<string | undefined> {
    return await db
        .delete(Wishlists)
        .where(eq(Wishlists.id, id))
        .returning({ id: Wishlists.id })
        .then(rows => rows[0].id)
}

/* Wishlist Items */

export async function getWishlistItem(
    id: string
): Promise<WishlistLineQueryResult | undefined> {
    return await db.query.WishlistItems.findFirst({
        where: eq(WishlistItems.id, id),
        with: {
            product: true,
        },
    })
}

export async function createWishlistItem(
    values: CreateWishlistItemRecordArgs
): Promise<WishlistLineQueryResult> {
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
            const [newWishlistItem] = await tx
                .insert(WishlistItems)
                .values({ ...values })
                .returning()

            const [wishlist] = await tx
                .select()
                .from(Wishlists)
                .where(eq(Wishlists.id, newWishlistItem.wishlistId))

            await tx
                .update(Wishlists)
                .set({
                    quantity: wishlist.quantity + 1,
                    updatedAt: new Date(),
                })
                .where(eq(Wishlists.id, wishlist.id))
                .returning()

            return {
                ...newWishlistItem,
                product,
            }
        } catch (error) {
            if (
                (error as Error).message.includes('wishlist_id_product_id_idx')
            ) {
                throw createConflictError('Wishlist item')
            } else {
                throw createInternalServerError()
            }
        }
    })
}

export async function deleteWishlistItem(id: string): Promise<string> {
    return await db.transaction(async tx => {
        const [deletedWishlistItem] = await tx
            .delete(WishlistItems)
            .where(eq(WishlistItems.id, id))
            .returning()

        if (!deletedWishlistItem) {
            throw createNotFoundError('Wishlist item')
        }

        const [wishlist] = await tx
            .select()
            .from(Wishlists)
            .where(eq(Wishlists.id, deletedWishlistItem.wishlistId))

        await tx
            .update(Wishlists)
            .set({
                quantity: wishlist.quantity - 1,
                updatedAt: new Date(),
            })
            .where(eq(Wishlists.id, wishlist.id))
            .returning()

        return deletedWishlistItem.id
    })
}

export async function getWishlistItemsByWishlistId(
    id: string,
    options?: { limit?: number; offset?: number; orderBy?: SQL }
): Promise<{ items: WishlistLineQueryResult[]; totalCount: number }> {
    const items = await db.query.WishlistItems.findMany({
        where: eq(WishlistItems.wishlistId, id),
        limit: options?.limit,
        offset: options?.offset,
        orderBy: options?.orderBy,
        with: {
            product: true,
        },
    })
    const [{ count: _count }] = await db
        .select({ count: count(WishlistItems) })
        .from(WishlistItems)
        .where(eq(WishlistItems.wishlistId, id))
    return { items, totalCount: _count }
}

export async function createWishlistItems(
    values: CreateWishlistItemRecordArgs[]
): Promise<WishlistLineQueryResult[]> {
    const items: WishlistLineQueryResult[] = []
    for await (const valueSet of values) {
        const newItem = await createWishlistItem(valueSet)
        items.push(newItem)
    }

    return items
}

type True = true
const wishlistWith = {
    items: {
        with: {
            product: true as True,
        },
    },
}
