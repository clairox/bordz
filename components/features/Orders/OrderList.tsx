import Link from 'next/link'

import PriceRepr from '@/components/common/PriceRepr'

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
                            {line.product?.board && (
                                <ul className="text-sm">
                                    <li className="line-clamp-1">
                                        {line.product.board?.deck.title}
                                    </li>
                                    <li className="line-clamp-1">
                                        {line.product.board?.trucks.title}
                                    </li>
                                    <li className="line-clamp-1">
                                        {line.product.board?.wheels.title}
                                    </li>
                                    <li className="line-clamp-1">
                                        {line.product.board?.bearings.title}
                                    </li>
                                    <li className="line-clamp-1">
                                        {line.product.board?.hardware.title}
                                    </li>
                                    <li className="line-clamp-1">
                                        {line.product.board?.griptape.title}
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

export { OrderList }
