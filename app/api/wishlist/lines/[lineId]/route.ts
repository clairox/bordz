import {
    getRequiredRequestCookie,
    getWishlist,
    handleRoute,
} from '@/app/api/shared'
import { db } from '@/drizzle/db'
import { WishlistLineItemTable, WishlistTable } from '@/drizzle/schema/wishlist'
import {
    createBadRequestError,
    createInternalServerError,
    createNotFoundError,
} from '@/lib/errors'
import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

type Props = DynamicRoutePropsWithParams<{ lineId: string }>

export const GET = async (_: NextRequest, { params: { lineId } }: Props) =>
    await handleRoute(async () => {
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

export const DELETE = async (
    request: NextRequest,
    { params: { lineId } }: Props
) =>
    await handleRoute(async () => {
        const { value: wishlistId } = getRequiredRequestCookie(
            request,
            'wishlistId'
        )

        await deleteWishlistLine(lineId)
        const updatedWishlist = await updateWishlistWithDeletedLine(wishlistId)

        return NextResponse.json(updatedWishlist)
    })

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
