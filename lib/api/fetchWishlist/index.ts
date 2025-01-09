import fetchAbsolute from '@/lib/fetchAbsolute'
import { WishlistResponse } from '@/types/api'

const fetchWishlist = async (customerId?: string): Promise<Wishlist> => {
    const response = await fetchAbsolute('/wishlist', {
        method: 'POST',
        body: JSON.stringify({ customerId }),
    })
    if (!response.ok) {
        throw response
    }
    const wishlist = (await response.json()) as WishlistResponse
    return {
        id: wishlist.id,
        ownerId: wishlist.ownerId,
        lines: wishlist.lines,
        quantity: wishlist.quantity,
    }
}

export default fetchWishlist
