import { getWishlist, handleRoute } from '@/app/api/shared'
import { db } from '@/drizzle/db'
import { WishlistLineItemTable, WishlistTable } from '@/drizzle/schema/wishlist'
import {
    createBadRequestError,
    createInternalServerError,
    createNotFoundError,
} from '@/lib/errors'
import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (
    _: NextRequest,
    context: { params: { lineId: string } }
) => {
    return handleRoute(async () => {
        const { lineId } = context.params

        const wishlistLine = await db.query.WishlistLineItemTable.findFirst({
            where: eq(WishlistLineItemTable.id, lineId),
            with: {
                product: {
                    with: {
                        boardSetup: true,
                    },
                },
            },
        })

        if (!wishlistLine) {
            throw createNotFoundError('Wishlist line')
        }

        return NextResponse.json(wishlistLine)
    })
}

export const DELETE = async (
    request: NextRequest,
    context: { params: { lineId: string } }
) => {
    return handleRoute(async () => {
        const wishlistId = request.cookies.get('wishlistId')?.value
        if (!wishlistId) {
            throw createBadRequestError('Missing wishlistId cookie.')
        }

        const { lineId } = context.params

        await deleteWishlistLine(lineId)
        const updatedWishlist = await updateWishlistWithDeletedLine(wishlistId)

        return NextResponse.json(updatedWishlist)
    })
}

const deleteWishlistLine = async (id: string) => {
    const deletedWishlistLine = await db
        .delete(WishlistLineItemTable)
        .where(eq(WishlistLineItemTable.id, id))
        .returning()
        .then(rows => rows[0])

    if (!deletedWishlistLine) {
        throw createNotFoundError('Wishlist line')
    }

    return deletedWishlistLine
}

const updateWishlistWithDeletedLine = async (id: string) => {
    const oldWishlist = await getWishlist(id)

    if (!oldWishlist) {
        throw createNotFoundError('Wishlist')
    }

    const updatedWishlist = await db
        .update(WishlistTable)
        .set({
            quantity: oldWishlist.quantity - 1,
            updatedAt: new Date(),
        })
        .where(eq(WishlistTable.id, id))
        .returning()
        .then(async rows => {
            const updatedWishlistId = rows[0].id
            return await getWishlist(updatedWishlistId)
        })

    if (!updatedWishlist) {
        throw createInternalServerError('Failed to update wishlist.')
    }

    return updatedWishlist
}
