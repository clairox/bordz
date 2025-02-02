import { NextRequest, NextResponse } from 'next/server'

import { handleRoute, PostSessionWishlist } from '../../shared'
import { CART_ID_COOKIE_MAX_AGE } from '@/utils/constants'
import {
    getWishlist,
    createWishlist,
    getCustomerWishlist,
    mergeWishlists,
} from 'services/wishlist'
import { WishlistQueryResult } from '@/types/queries'
import { appendCookie } from '@/utils/session'
import { chkRequest } from '@/lib/validator'

export const POST = async (request: NextRequest) =>
    await handleRoute(async () => {
        const { customerId } = await chkRequest(PostSessionWishlist, request)
        const sessionWishlistId = request.cookies.get('wishlistId')?.value

        if (customerId) {
            const customerWishlist = await getCustomerWishlist(customerId)
            const guestWishlist = sessionWishlistId
                ? await getWishlist(sessionWishlistId)
                : undefined

            if (guestWishlist) {
                const mergedWishlist = await mergeWishlists(
                    guestWishlist,
                    customerWishlist
                )
                return createWishlistResponse(mergedWishlist)
            } else {
                return createWishlistResponse(customerWishlist)
            }
        } else {
            let guestWishlist = sessionWishlistId
                ? await getWishlist(sessionWishlistId)
                : undefined

            if (guestWishlist) {
                return createWishlistResponse(guestWishlist)
            } else {
                guestWishlist = await createWishlist()
                return createWishlistResponse(guestWishlist)
            }
        }
    })

const appendWishlistCookie = (
    value: string,
    response: NextResponse<WishlistQueryResult>
): NextResponse<WishlistQueryResult> => {
    return appendCookie('wishlistId', value, response, {
        maxAge: CART_ID_COOKIE_MAX_AGE,
    })
}

const createWishlistResponse = (
    wishlist: WishlistQueryResult
): NextResponse<WishlistQueryResult> => {
    const response = NextResponse.json(wishlist)
    return appendWishlistCookie(wishlist.id, response)
}
