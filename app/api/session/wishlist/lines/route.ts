import { NextRequest, NextResponse } from 'next/server'
import { asc, desc, eq, SQL } from 'drizzle-orm'

import {
    calculateNextPageNumber,
    getProduct,
    getRequestOptionsParams,
    getRequiredRequestCookie,
    getWishlist,
    handleRoute,
    validateRequestBody,
} from '../../../shared'
import {
    createConflictError,
    createInternalServerError,
    createNotFoundError,
} from '@/lib/errors'
import { WishlistItems, Wishlists } from '@/drizzle/schema/wishlist'
import { db } from '@/drizzle/db'
import { ProductRecord } from '@/types/database'
import { SortKey } from '@/types/sorting'
import { UNEXPECTED_ERROR_TEXT } from '@/utils/constants'

export const GET = async (request: NextRequest) =>
    await handleRoute(async () => {
        const { value: wishlistId } = getRequiredRequestCookie(
            request,
            'wishlistId'
        )
        const { page, size, orderBy } = getRequestOptionsParams(request)

        const sorts: Partial<Record<SortKey, SQL>> = {
            'date-desc': desc(WishlistItems.createdAt),
            'date-asc': asc(WishlistItems.createdAt),
        }

        const where = eq(WishlistItems.wishlistId, wishlistId)

        const lines = await db.query.WishlistItems.findMany({
            where,
            limit: size,
            offset: (page - 1) * size,
            orderBy: sorts[orderBy],
            with: {
                product: true,
            },
        })

        const nextPage = await calculateNextPageNumber(
            page,
            size,
            WishlistItems,
            where
        )

        return NextResponse.json({ data: lines, nextPage })
    })

export const POST = async (request: NextRequest) =>
    await handleRoute(async () => {
        const { value: wishlistId } = getRequiredRequestCookie(
            request,
            'wishlistId'
        )

        const data = await request.json()
        validateRequestBody(data, ['productId'])

        const product = await getProduct(data.productId)
        if (!product) {
            throw createNotFoundError('Product')
        }

        await createWishlistLine(product, wishlistId)
        const updatedWishlist = await updateWishlistWithNewLine(wishlistId)

        return NextResponse.json(updatedWishlist)
    })

export const DELETE = async (request: NextRequest) =>
    await handleRoute(async () => {
        const { value: wishlistId } = getRequiredRequestCookie(
            request,
            'wishlistId'
        )

        const oldWishlist = await getWishlist(wishlistId)
        if (!oldWishlist) {
            throw createNotFoundError('Wishlist')
        }

        await db
            .delete(WishlistItems)
            .where(eq(WishlistItems.wishlistId, oldWishlist.id))

        const updatedWishlist = await db
            .update(Wishlists)
            .set({
                quantity: 0,
                updatedAt: new Date(),
            })
            .where(eq(Wishlists.id, wishlistId))

        if (!updatedWishlist) {
            throw createInternalServerError('Failed to update wishlist.')
        }

        return NextResponse.json(updatedWishlist)
    })

const createWishlistLine = async (
    product: ProductRecord,
    wishlistId: string
) => {
    try {
        const newWishlistLine = await db
            .insert(WishlistItems)
            .values({
                productId: product.id,
                wishlistId,
            })
            .returning()
            .then(async rows => {
                const id = rows[0].id
                return await db.query.WishlistItems.findFirst({
                    where: eq(WishlistItems.id, id),
                    with: {
                        product: true,
                    },
                })
            })

        if (!newWishlistLine) {
            throw createInternalServerError('Failed to create wishlist line.')
        }

        return newWishlistLine
    } catch (error) {
        if ((error as Error).message.includes('wishlist_id_product_id_idx')) {
            throw createConflictError('Wishlist line')
        } else {
            console.error(error)
            throw createInternalServerError(UNEXPECTED_ERROR_TEXT)
        }
    }
}

const updateWishlistWithNewLine = async (id: string) => {
    const oldWishlist = await getWishlist(id)

    if (!oldWishlist) {
        throw createNotFoundError('Wishlist')
    }

    const updatedCart = await db
        .update(Wishlists)
        .set({
            quantity: oldWishlist.quantity + 1,
            updatedAt: new Date(),
        })
        .where(eq(Wishlists.id, id))
        .returning()
        .then(async rows => {
            const updatedWishlistId = rows[0].id
            return await getWishlist(updatedWishlistId)
        })

    if (!updatedCart) {
        throw createInternalServerError('Failed to update cart.')
    }

    return updatedCart
}
