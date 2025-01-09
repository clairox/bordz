import { WishlistResponse } from '@/types/api'
import productResponseToProduct from './productResponseToProduct'

const wishlistResponseToWishlist = (data: WishlistResponse): Wishlist => {
    return {
        id: data.id,
        ownerId: data.ownerId ?? undefined,
        lines: data.lines.map(line => ({
            id: line.id,
            wishlistId: line.wishlistId,
            product: productResponseToProduct(line.product),
        })),
        quantity: data.quantity,
    }
}

export default wishlistResponseToWishlist
