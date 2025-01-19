import { fetchCart, fetchCustomer, fetchWishlist } from '@/lib/api'
import { verifySessionToken } from './verifySessionToken'
import {
    mapCartResponseToCart,
    mapCustomerResponseToCustomer,
    mapWishlistResponseToWishlist,
} from '../conversions'
import { decodeSessionToken } from './decodeSessionToken'

export const fetchSessionData = async (
    sessionToken: string,
    verify: boolean = true
): Promise<Session | undefined> => {
    let userId, email: string

    if (verify) {
        const { payload } = await verifySessionToken(sessionToken)
        userId = payload.sub
        email = payload.email as string
    } else {
        const payload = decodeSessionToken(sessionToken)
        userId = payload.sub
        email = payload.email as string
    }

    if (userId && email) {
        const customer = await fetchCustomer(userId)
        const cart = await fetchCart(customer.id)
        const wishlist = await fetchWishlist(customer.id)

        return {
            auth: { id: userId, email: email as string },
            customer: mapCustomerResponseToCustomer(customer),
            cart: mapCartResponseToCart(cart),
            wishlist: mapWishlistResponseToWishlist(wishlist),
        }
    }

    return undefined
}
