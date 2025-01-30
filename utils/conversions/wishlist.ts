import { WishlistResponse } from '@/types/api'
import { mapProductResponseToProduct } from '.'

export const mapWishlistResponseToWishlist = (
    response: WishlistResponse
): Wishlist => {
    return {
        id: response.id,
        ownerId: response.ownerId ?? undefined,
        lines: response.items.map(item => ({
            id: item.id,
            wishlistId: item.wishlistId,
            product: mapProductResponseToProduct(item.product),
        })),
        quantity: response.quantity,
    }
}
