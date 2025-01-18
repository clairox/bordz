import PageHeading from '@/components/common/PageHeading'
import { CartContainer } from '@/components/features/Cart/server'
import { Suspense } from 'react'

const CartPage: React.FC = () => {
    return (
        <div>
            <PageHeading>Your Cart</PageHeading>
            <Suspense fallback={<div>Loading...</div>}>
                <CartContainer />
            </Suspense>
        </div>
    )
}

export default CartPage
