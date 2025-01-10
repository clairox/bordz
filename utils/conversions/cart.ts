import { CartResponse } from '@/types/api'
import { mapProductResponseToProduct } from '.'

export const mapCartResponseToCart = (response: CartResponse): Cart => {
    const lines = response.lines.map(line => {
        return {
            id: line.id,
            cartId: line.cartId,
            product: mapProductResponseToProduct(line.product),
            quantity: line.quantity,
            subtotal: line.subtotal,
            total: line.total,
        }
    })

    return {
        id: response.id,
        ownerId: response.ownerId ?? undefined,
        lines: lines,
        totalQuantity: response.totalQuantity,
        subtotal: response.subtotal,
        total: response.total,
        checkoutId: response.checkout?.id,
    }
}
