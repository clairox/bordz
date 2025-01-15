'use client'

import { AccountHeading, AccountSection } from '@/components/features/Account'
import { OrderListContainer } from '@/components/features/Orders'
import { SortKey } from '@/types/sorting'
import { DEFAULT_SORT_KEY } from '@/utils/constants'

type OrdersPageProps = {
    searchParams: { orderBy?: string }
}

const OrdersPage: React.FC<OrdersPageProps> = ({ searchParams }) => {
    const orderBy = (searchParams.orderBy as SortKey) ?? DEFAULT_SORT_KEY

    return (
        <section>
            <AccountHeading>Your orders</AccountHeading>
            <AccountSection>
                <AccountSection.Content>
                    <OrderListContainer orderBy={orderBy} />
                </AccountSection.Content>
            </AccountSection>
        </section>
    )
}

export default OrdersPage
