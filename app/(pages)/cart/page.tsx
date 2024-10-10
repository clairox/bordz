import Cart from '@/components/Cart'
import { CartProvider } from '@/providers/Cart'

const CartPage: React.FC = () => {
    return (
        <CartProvider>
            <Cart />
        </CartProvider>
    )
}

export default CartPage
