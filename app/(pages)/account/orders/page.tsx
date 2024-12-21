'use client'

import { Fragment } from 'react'
import Link from 'next/link'

import AccountHeading from '../_components/AccountHeading'
import { default as Section } from '../_components/AccountSection'
import OrderList from '../_components/OrderList'
import { useCustomer } from '@/context/CustomerContext'
import { useOrders } from '@/hooks'
import InfiniteItemList from '@/components/InfiniteItemList'

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
                    <InfiniteItemList
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
