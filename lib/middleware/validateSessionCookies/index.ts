import { NextRequest, NextResponse } from 'next/server'
import { User } from '@supabase/supabase-js'

import {
    fetchCart,
    fetchSessionCart,
    fetchSessionWishlist,
    fetchWishlist,
} from '@/lib/api'
import fetchAbsolute from '@/lib/fetchAbsolute'
import {
    CART_ID_COOKIE_MAX_AGE,
    DEFAULT_COOKIE_CONFIG,
} from '@/utils/constants'

export const validateSessionCookies = async (
    user: User,
    request: NextRequest,
    response: NextResponse
): Promise<NextResponse> => {
    const cartId = request.cookies.get('cartId')?.value
    const wishlistId = request.cookies.get('wishlistId')?.value

    const customer = await fetchAbsolute<Customer>(`/customers/${user.id}`)
    const { isValid } = await fetchAbsolute<{ isValid: boolean }>(
        '/session/validate-cookies',
        {
            method: 'POST',
            body: JSON.stringify({
                customerId: customer.id,
                cartId,
                wishlistId,
            }),
        }
    )

    if (!isValid) {
        const validCart = await fetchSessionCart(customer.id)
        const validWishlist = await fetchSessionWishlist(customer.id)

        response.cookies.set('cartId', validCart.id, {
            ...DEFAULT_COOKIE_CONFIG,
            maxAge: CART_ID_COOKIE_MAX_AGE,
        })
        response.cookies.set('wishlistId', validWishlist.id, {
            ...DEFAULT_COOKIE_CONFIG,
            maxAge: CART_ID_COOKIE_MAX_AGE,
        })
    }

    return response
}
