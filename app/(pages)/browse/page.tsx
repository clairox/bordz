import ProductsList from '@/components/ProductsList'
import { CartProvider } from '@/providers/Cart'

const BrowsePage: React.FC = () => {
    return (
        <CartProvider>
            <ProductsList />
        </CartProvider>
    )
}

export default BrowsePage
