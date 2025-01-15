import { Suspense } from 'react'

import { AccountHeading, AccountSection } from '@/components/features/Account'
import { OrderDetails } from '@/components/features/Orders'

type OrderPageProps = {
    params: { orderId: string }
}

const OrderPage: React.FC<OrderPageProps> = ({ params }) => {
    return (
        <div>
            <AccountHeading>Order details</AccountHeading>
            <AccountSection>
                <AccountSection.Content>
                    <Suspense fallback={<Fallback />}>
                        <OrderDetails id={params.orderId} />
                    </Suspense>
                </AccountSection.Content>
            </AccountSection>
        </div>
    )
}

const Fallback = () => <div>Loading...</div>

export default OrderPage
