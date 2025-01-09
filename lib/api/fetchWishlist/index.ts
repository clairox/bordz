import fetchAbsolute from '@/lib/fetchAbsolute'
import { WishlistResponse } from '@/types/api'
import wishlistResponseToWishlist from '@/utils/helpers/wishlistResponseToWishlist'

const fetchWishlist = async (customerId?: string): Promise<Wishlist> => {
    const data = await fetchAbsolute<WishlistResponse>('/wishlist', {
        method: 'POST',
        body: JSON.stringify({ customerId }),
    })
    return wishlistResponseToWishlist(data)
}

export default fetchWishlist
