import { NextRequest, NextResponse } from 'next/server'
import { handleRoute, validateRequestBody } from '../../shared'
import { getCart } from 'services/cart'
import { getWishlist } from 'services/wishlist'

export const POST = async (request: NextRequest) =>
    await handleRoute(async () => {
        const data = await request.json()
        try {
            validateRequestBody(data, ['customerId', 'cartId', 'wishlistId'])
        } catch {
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
