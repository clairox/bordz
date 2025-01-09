'use client'

import { useQuery } from '@tanstack/react-query'

import PriceRepr from '@/components/PriceRepr'
import { fetchOrder } from '@/lib/api'
import orderResponseToOrder from '@/utils/helpers/orderResponseToOrder'

type OrderPageProps = {
    params: { orderId: string }
}

const OrderPage: React.FC<OrderPageProps> = ({ params }) => {
    const { orderId } = params

    const {
        data: order,
        error,
        isPending,
    } = useQuery<Order>({
        queryKey: ['order', orderId],
        queryFn: async () => {
            const response = await fetchOrder(orderId)
            return orderResponseToOrder(response)
        },
    })

    if (error) {
        return <div>Something went wrong...</div>
    }

    if (isPending) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <p className="font-semibold">Order No: {order.id}</p>
            {order?.lines.map(line => {
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
    )
}

export default OrderPage
