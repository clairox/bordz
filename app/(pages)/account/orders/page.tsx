'use client'

import { Fragment } from 'react'
import Link from 'next/link'

import {
    AccountHeading,
    AccountSection as Section,
} from '@/components/features/Account'
import { OrderList } from '@/components/features/Orders'
import { useCustomer } from '@/context/CustomerContext'
import { useOrders } from '@/hooks/data/order'
import InfiniteList from '@/components/common/InfiniteList'

const OrdersPage = () => {
    const { data: customer, error, isPending } = useCustomer()

    if (error) {
        return <div>Something went wrong</div>
    }

    if (isPending) {
        return <div>Loading...</div>
    }

    return <OrdersView customer={customer!} />
}

type OrdersViewProps = {
    customer: Customer
}

const OrdersView: React.FC<OrdersViewProps> = ({ customer }) => {
    const { data, hasNextPage, fetchNextPage } = useOrders({
        customerId: customer.id,
    })

    return (
        <div>
            <AccountHeading>Orders</AccountHeading>
            <Section>
                <Section.Content>
                    <InfiniteList
                        pages={data.pages}
                        hasNextPage={hasNextPage}
                        fetchNextPage={fetchNextPage}
                        render={items => (
                            <Fragment>
                                {items.length > 0 ? (
                                    <OrderList orders={items} />
                                ) : (
                                    <p>
                                        You have not yet placed an order. Go to
                                        your <Link href="/cart">cart</Link>?
                                    </p>
                                )}
                            </Fragment>
                        )}
                    />
                </Section.Content>
            </Section>
        </div>
    )
}

export default OrdersPage
