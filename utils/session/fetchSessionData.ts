import {
    fetchCustomer,
    fetchSessionCart,
    fetchSessionWishlist,
} from '@/lib/api'
import {
    mapCartResponseToCart,
    mapCustomerResponseToCustomer,
    mapWishlistResponseToWishlist,
} from '../conversions'
import { decodeSessionToken } from './decodeSessionToken'

export const fetchSessionData = async (token: string): Promise<Session> => {
    const { sub: userId } = decodeSessionToken(token)

    let customer: Customer | null = null
    if (userId) {
        customer = await fetchCustomer(userId)
            .then(res => mapCustomerResponseToCustomer(res))
            .catch(() => null)
    }

    const cart = await fetchSessionCart(customer?.id)
        .then(res => mapCartResponseToCart(res))
        .catch(err => {
            throw err
        })

    const wishlist = await fetchSessionWishlist(customer?.id)
        .then(res => mapWishlistResponseToWishlist(res))
        .catch(err => {
            throw err
        })

    return { customer, cart, wishlist }
}
