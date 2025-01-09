import fetchAbsolute from '@/lib/fetchAbsolute'
import { CartResponse } from '@/types/api'
import productResponseToProduct from '@/utils/helpers/productResponseToProduct'

const fetchCart = async (customerId?: string): Promise<Cart> => {
    const response = await fetchAbsolute('/cart', {
        method: 'POST',
        body: JSON.stringify({ customerId }),
    })
    if (!response.ok) {
        throw response
    }
    return cartResponseToCart(await response.json())
}

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

export default fetchCart
