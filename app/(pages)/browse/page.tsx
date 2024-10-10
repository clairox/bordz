import ProductsList from '@/components/ProductsList'
import { CartProvider } from '@/context/cartContext'

const BrowsePage: React.FC = () => {
    return (
        <CartProvider>
            <ProductsList />
        </CartProvider>
    )
}

export default BrowsePage
