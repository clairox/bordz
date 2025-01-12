import PageHeading from '@/components/common/PageHeading'
import { Cart } from '@/components/features/Cart'

const CartPage: React.FC = () => {
    return (
        <section>
            <PageHeading>Your Cart</PageHeading>
            <Cart />
        </section>
    )
}

export default CartPage
