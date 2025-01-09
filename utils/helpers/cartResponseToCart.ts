import { CartResponse } from '@/types/api'
import productResponseToProduct from './productResponseToProduct'

const cartResponseToCart = (data: CartResponse): Cart => {
    const lines = data.lines.map(line => {
        return {
            id: line.id,
            cartId: line.cartId,
            product: productResponseToProduct(line.product),
            quantity: line.quantity,
            subtotal: line.subtotal,
            total: line.total,
        }
    })

    return {
        id: data.id,
        ownerId: data.ownerId ?? undefined,
        lines: lines,
        totalQuantity: data.totalQuantity,
        subtotal: data.subtotal,
        total: data.total,
        checkoutId: data.checkout?.id,
    }
}

export default cartResponseToCart
