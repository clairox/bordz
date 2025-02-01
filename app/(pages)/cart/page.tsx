import PageHeading from '@/components/common/PageHeading'
import { CartContainer } from '@/components/features/Cart/server'

const CartPage: React.FC = () => {
    return (
        <div>
            <PageHeading>Your Cart</PageHeading>
            <CartContainer />
        </div>
    )
}

export default CartPage
