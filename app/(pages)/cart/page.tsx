import Cart from '@/components/Cart'
import { CartProvider } from '@/context/cartContext'

const CartPage: React.FC = () => {
    return (
        <CartProvider>
            <Cart />
        </CartProvider>
    )
}

export default CartPage
