import Link from 'next/link'

import PriceRepr from '@/components/PriceRepr'

type OrderListProps = {
    orders: Order[]
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
    return orders.map(order => {
        return <OrderListItem key={order.id} order={order} />
    })
}

type OrderItemProps = {
    order: Order
}

const OrderListItem: React.FC<OrderItemProps> = ({ order }) => {
    return (
        <Link href={`/account/orders/${order.id}`}>
            <div className="mb-3 hover:bg-gray-100">
                <p className="font-semibold">Order No: {order.id}</p>
                {order.lines.map(line => {
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
                                        {
                                            line.product.boardSetup?.bearings
                                                .title
                                        }
                                    </li>
                                    <li className="line-clamp-1">
                                        {
                                            line.product.boardSetup?.hardware
                                                .title
                                        }
                                    </li>
                                    <li className="line-clamp-1">
                                        {
                                            line.product.boardSetup?.griptape
                                                .title
                                        }
                                    </li>
                                </ul>
                            )}
                            <p>
                                <PriceRepr value={line.total} />
                            </p>
                        </article>
                    )
                })}
            </div>
        </Link>
    )
}

export default OrderList
