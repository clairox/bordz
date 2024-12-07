'use client'

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'

import { useAuthQuery } from '@/context/AuthContext'
import AccountHeading from '../AccountHeading'
import { default as Section } from '../AccountSection'
import fetchAbsolute from '@/lib/fetchAbsolute'
import PriceRepr from '@/components/PriceRepr'

const OrdersPage = () => {
    const {
        customer: { data: customer },
    } = useAuthQuery()

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

type OrderListProps = {
    orders: Order[]
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
    return orders.map(order => {
        return (
            <div key={order.id} className="mb-3">
                <p className="font-semibold">Order No: {order.id}</p>
                <OrderItem order={order} />
            </div>
        )
    })
}

type OrderItemProps = {
    order: Order
}

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
    return order.lines.map(line => {
        return (
            <article key={line.id}>
                <h3>
                    {line.quantity} x {line.title}
                </h3>
                {line.product?.boardSetup && (
                    <ul className="text-sm">
                        <li className="line-clamp-1">
                            {line.product.boardSetup?.deck.title}
                        </li>
                        <li className="line-clamp-1">
                            {line.product.boardSetup?.trucks.title}
                        </li>
                        <li className="line-clamp-1">
                            {line.product.boardSetup?.wheels.title}
                        </li>
                        <li className="line-clamp-1">
                            {line.product.boardSetup?.bearings.title}
                        </li>
                        <li className="line-clamp-1">
                            {line.product.boardSetup?.hardware.title}
                        </li>
                        <li className="line-clamp-1">
                            {line.product.boardSetup?.griptape.title}
                        </li>
                    </ul>
                )}
                <p>
                    <PriceRepr value={line.total} />
                </p>
            </article>
        )
    })
}

export default OrdersPage
