import { WishlistResponse } from '@/types/api'
import { mapProductResponseToProduct } from '.'

export const mapWishlistResponseToWishlist = (
    response: WishlistResponse
): Wishlist => {
    return {
        id: response.id,
        ownerId: response.ownerId ?? undefined,
        lines: response.lines.map(line => ({
            id: line.id,
            wishlistId: line.wishlistId,
            product: mapProductResponseToProduct(line.product),
        })),
        quantity: response.quantity,
    }
}
