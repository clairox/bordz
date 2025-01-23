import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'

import {
    fetchSessionCart,
    fetchCustomer,
    fetchWishlist,
    fetchCart,
    fetchSessionWishlist,
} from '@/lib/api'
import {
    mapCartResponseToCart,
    mapCustomerResponseToCustomer,
    mapWishlistResponseToWishlist,
} from '../conversions'
import { User } from '@supabase/supabase-js'

// TODO: Return something from cart and wishlist fetches. If cartId or wishlistId is deleted by user an error will be thrown on init
export const initializeSession = async (
    user: User | null,
    cookies: ReadonlyRequestCookies
): Promise<InitialAppState> => {
    const cartId = cookies.get('cartId')?.value
    const wishlistId = cookies.get('wishlistId')?.value

    let customer: Customer | null = null
    if (user?.id) {
        customer = await fetchCustomer(user.id)
            .then(res => mapCustomerResponseToCustomer(res))
            .catch(() => null)
    }

    let cart: Cart | undefined = undefined
    if (cartId) {
        cart = await fetchCart(cartId)
            .then(res => mapCartResponseToCart(res))
            .catch(err => {
                throw err
            })
    } else {
        // cart = await fetchSessionCart(customer?.id)
        //     .then(res => mapCartResponseToCart(res))
        //     .catch(err => {
        //         throw err
        //     })
    }

    let wishlist: Wishlist | undefined = undefined
    if (wishlistId) {
        wishlist = await fetchWishlist(wishlistId)
            .then(res => mapWishlistResponseToWishlist(res))
            .catch(err => {
                throw err
            })
    } else {
        // wishlist = await fetchSessionWishlist(customer?.id)
        //     .then(res => mapWishlistResponseToWishlist(res))
        //     .catch(err => {
        //         throw err
        //     })
    }

    return { customer, cart, wishlist }
}
