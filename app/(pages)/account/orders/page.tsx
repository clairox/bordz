'use client'

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'

import AccountHeading from '../_components/AccountHeading'
import { default as Section } from '../_components/AccountSection'
import fetchAbsolute from '@/lib/fetchAbsolute'
import OrderList from '../_components/OrderList'
import { useCustomer } from '@/context/CustomerContext'

const OrdersPage = () => {
    const { data: customer } = useCustomer()

    const {
        data: orders,
        error,
        isPending,
    } = useQuery<Order[]>({
        queryKey: ['orders', customer?.id],
        queryFn: async () => {
            const response = await fetchAbsolute('/orders')
            if (!response.ok) {
                throw response
            }
            return await response.json()
        },
    })

    if (error) {
        return <div>Something went wrong</div>
    }

    if (isPending) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <AccountHeading>Orders</AccountHeading>
            <Section>
                <Section.Content>
                    {orders.length > 0 ? (
                        <OrderList orders={orders} />
                    ) : (
                        <p>
                            You have not yet placed an order. Go to your{' '}
                            <Link href="/cart">cart</Link>?
                        </p>
                    )}
                </Section.Content>
            </Section>
        </div>
    )
}

export default OrdersPage
