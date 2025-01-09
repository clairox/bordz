import fetchAbsolute from '@/lib/fetchAbsolute'
import { CartResponse } from '@/types/api'
import cartResponseToCart from '@/utils/helpers/cartResponseToCart'

const fetchCart = async (customerId?: string): Promise<Cart> => {
    const data = await fetchAbsolute<CartResponse>('/cart', {
        method: 'POST',
        body: JSON.stringify({ customerId }),
    })
    return cartResponseToCart(data)
}

export default fetchCart
