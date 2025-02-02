import { NextRequest, NextResponse } from 'next/server'
import { handleRoute, PostValidateSessionCookiesSchema } from '../../shared'
import { getCart } from 'services/cart'
import { getWishlist } from 'services/wishlist'
import { chkRequest } from '@/lib/validator'

export const POST = async (request: NextRequest) =>
    await handleRoute(async () => {
        const data = await chkRequest(PostValidateSessionCookiesSchema, request)
            .then(data => data)
            .catch(() => undefined)
        if (!data) {
            return NextResponse.json({ isValid: false })
        }

        let isValid = false
        const cart = await getCart(data.cartId)
        const wishlist = await getWishlist(data.wishlistId)
        const validCartId = cart.ownerId === data.customerId
        const validWishlistId = wishlist.ownerId === data.customerId

        if (validCartId && validWishlistId) {
            isValid = true
        }

        return NextResponse.json({ isValid })
    })
