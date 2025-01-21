import { NextRequest, NextResponse } from 'next/server'
import { and, eq, notInArray } from 'drizzle-orm'
import { serialize } from 'cookie'

import { getWishlist, handleRoute } from '../../shared'
import { db } from '@/drizzle/db'
import { WishlistLineRecord, WishlistRecord } from '@/types/database'
import { WishlistItems, Wishlists } from '@/drizzle/schema/wishlist'
import { createInternalServerError } from '@/lib/errors'
import {
    DEFAULT_COOKIE_CONFIG,
    WISHLIST_ID_COOKIE_MAX_AGE,
} from '@/utils/constants'

export const POST = async (request: NextRequest) =>
    await handleRoute(async () => {
        const { customerId } = await request.json()

        if (customerId) {
            let customerWishlist = await getWishlistByOwnerId(customerId)

            if (!customerWishlist) {
                customerWishlist = await createWishlist(customerId)

                const wishlistId = request.cookies.get('wishlistId')?.value
                const guestWishlist = wishlistId
                    ? await getWishlist(wishlistId)
                    : null

                if (guestWishlist) {
                    customerWishlist = await mergeWishlists(
                        customerWishlist,
                        guestWishlist
                    )
                }

                if (!customerWishlist) {
                    throw createInternalServerError()
                }

                const response = NextResponse.json(customerWishlist)
                return addWishlistIdCookieToResponse(
                    customerWishlist.id,
                    response
                )
            } else {
                const wishlistId = request.cookies.get('wishlistId')?.value

                if (!wishlistId) {
                    const response = NextResponse.json(customerWishlist)
                    return addWishlistIdCookieToResponse(
                        customerWishlist.id,
                        response
                    )
                } else if (wishlistId !== customerWishlist.id) {
                    const guestWishlist = await getWishlist(wishlistId)
                    if (guestWishlist) {
                        customerWishlist = await mergeWishlists(
                            customerWishlist,
                            guestWishlist
                        )
                    }

                    if (!customerWishlist) {
                        throw createInternalServerError()
                    }

                    const response = NextResponse.json(customerWishlist)
                    return addWishlistIdCookieToResponse(
                        customerWishlist.id,
                        response
                    )
                } else {
                    const response = NextResponse.json(customerWishlist)
                    return response
                }
            }
        } else {
            const wishlistId = request.cookies.get('wishlistId')?.value

            if (wishlistId) {
                let guestWishlist = await getWishlist(wishlistId)

                if (!guestWishlist) {
                    guestWishlist = await createWishlist(customerId)

                    const response = NextResponse.json(guestWishlist)
                    return addWishlistIdCookieToResponse(
                        guestWishlist.id,
                        response
                    )
                } else {
                    return NextResponse.json(guestWishlist)
                }
            } else {
                const newGuestWishlist = await createWishlist()

                const response = NextResponse.json(newGuestWishlist)
                return addWishlistIdCookieToResponse(
                    newGuestWishlist.id,
                    response
                )
            }
        }
    })

const getWishlistByOwnerId = async (ownerId: string) => {
    return await db.query.Wishlists.findFirst({
        where: eq(Wishlists.ownerId, ownerId),
        with: {
            lines: {
                with: {
                    product: true,
                },
            },
        },
    })
}

const createWishlist = async (ownerId?: string) => {
    const newWishlist = await db
        .insert(Wishlists)
        .values({ ownerId })
        .returning()
        .then(async rows => await getWishlist(rows[0].id))

    if (!newWishlist) {
        throw createInternalServerError('Failed to create wishlist.')
    }

    return newWishlist
}

type WishlistType = WishlistRecord & { lines: WishlistLineRecord[] }
const mergeWishlists = async (target: WishlistType, source: WishlistType) => {
    if (source.lines.length === 0) {
        return await getWishlist(target.id)
    }

    const sourceLines = await db
        .select()
        .from(WishlistItems)
        .where(
            and(
                eq(WishlistItems.wishlistId, source.id),
                notInArray(
                    WishlistItems.productId,
                    target.lines.map(line => line.productId)
                )
            )
        )

    if (sourceLines.length) {
        await db.insert(WishlistItems).values(
            sourceLines.map(line => {
                return {
                    productId: line.productId,
                    wishlistId: target.id,
                }
            })
        )
    }

    await db.delete(Wishlists).where(eq(Wishlists.id, source.id))

    if (sourceLines.length) {
        return await db
            .update(Wishlists)
            .set({
                quantity: target.quantity + sourceLines.length,
                updatedAt: new Date(),
            })
            .where(eq(Wishlists.id, target.id))
            .returning()
            .then(async rows => await getWishlist(rows[0].id))
    } else {
        return await getWishlist(target.id)
    }
}

const addWishlistIdCookieToResponse = (
    wishlistId: string,
    response: NextResponse
) => {
    const cookie = serialize('wishlistId', wishlistId, {
        ...DEFAULT_COOKIE_CONFIG,
        maxAge: WISHLIST_ID_COOKIE_MAX_AGE,
    })

    response.headers.append('Set-Cookie', cookie)
    return response
}
