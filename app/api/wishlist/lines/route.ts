import { NextRequest, NextResponse } from 'next/server'
import { count, eq } from 'drizzle-orm'

import { getProduct, getWishlist, handleRoute } from '../../shared'
import {
    createBadRequestError,
    createConflictError,
    createInternalServerError,
    createNotFoundError,
} from '@/lib/errors'
import { WishlistLineItemTable, WishlistTable } from '@/drizzle/schema/wishlist'
import { db } from '@/drizzle/db'
import { ProductRecord } from '@/types/records'

const defaultLimit = 40
const defaultPage = 1

export const GET = async (request: NextRequest) => {
    return handleRoute(async () => {
        const wishlistId = request.cookies.get('wishlistId')?.value
        if (!wishlistId) {
            throw createBadRequestError()
        }

        const searchParams = request.nextUrl.searchParams
        const pageSize = Number(searchParams.get('size') || defaultLimit)
        const page = Number(searchParams.get('page') || defaultPage)

        const lines = await db.query.WishlistLineItemTable.findMany({
            where: eq(WishlistLineItemTable.wishlistId, wishlistId),
            limit: pageSize,
            offset: (page - 1) * pageSize,
            with: {
                product: {
                    with: {
                        boardSetup: {
                            with: {
                                deck: true,
                                trucks: true,
                                wheels: true,
                                bearings: true,
                                hardware: true,
                                griptape: true,
                            },
                        },
                    },
                },
            },
        })

        const lineCount = await db
            .select({ count: count() })
            .from(WishlistLineItemTable)
            .where(eq(WishlistLineItemTable.wishlistId, wishlistId))
            .then(rows => rows[0].count)
        const totalPages = Math.ceil(lineCount / pageSize)
        const nextPage = totalPages > page ? page + 1 : undefined

        return NextResponse.json({ data: lines, nextPage })
    })
}

export const POST = async (request: NextRequest) => {
    return handleRoute(async () => {
        const wishlistId = request.cookies.get('wishlistId')?.value
        if (!wishlistId) {
            throw createBadRequestError('Missing wishlistId cookie.')
        }

        const { productId } = await request.json()

        if (!productId) {
            throw createBadRequestError('Missing productId.')
        }

        const product = await getProduct(productId)
        if (!product) {
            throw createNotFoundError('Product')
        }

        await createWishlistLine(product, wishlistId)
        const updatedWishlist = await updateWishlistWithNewLine(wishlistId)

        return NextResponse.json(updatedWishlist)
    })
}

export const DELETE = async (request: NextRequest) => {
    return handleRoute(async () => {
        const wishlistId = request.cookies.get('wishlistId')?.value
        if (!wishlistId) {
            throw createBadRequestError('Missing wishlistId cookie.')
        }

        const oldWishlist = await getWishlist(wishlistId)
        if (!oldWishlist) {
            throw createNotFoundError('Wishlist')
        }

        await db
            .delete(WishlistLineItemTable)
            .where(eq(WishlistLineItemTable.wishlistId, oldWishlist.id))

        const updatedWishlist = await db
            .update(WishlistTable)
            .set({
                quantity: 0,
                updatedAt: new Date(),
            })
            .where(eq(WishlistTable.id, wishlistId))

        if (!updatedWishlist) {
            throw createInternalServerError('Failed to update wishlist.')
        }

        return NextResponse.json(updatedWishlist)
    })
}

const createWishlistLine = async (
    product: ProductRecord,
    wishlistId: string
) => {
    try {
        const newWishlistLine = await db
            .insert(WishlistLineItemTable)
            .values({
                productId: product.id,
                wishlistId,
            })
            .returning()
            .then(async rows => {
                const id = rows[0].id
                return await db.query.WishlistLineItemTable.findFirst({
                    where: eq(WishlistLineItemTable.id, id),
                    with: {
                        product: {
                            with: {
                                boardSetup: {
                                    with: {
                                        deck: true,
                                        trucks: true,
                                        wheels: true,
                                        bearings: true,
                                        hardware: true,
                                        griptape: true,
                                    },
                                },
                            },
                        },
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
            throw createInternalServerError('An unexpected error occurred.')
        }
    }
}

const updateWishlistWithNewLine = async (id: string) => {
    const oldWishlist = await getWishlist(id)

    if (!oldWishlist) {
        throw createNotFoundError('Wishlist')
    }

    const updatedCart = await db
        .update(WishlistTable)
        .set({
            quantity: oldWishlist.quantity + 1,
            updatedAt: new Date(),
        })
        .where(eq(WishlistTable.id, id))
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
