'use client'

import { useQuery } from '@tanstack/react-query'

import PriceRepr from '@/components/PriceRepr'
import fetchAbsolute from '@/lib/fetchAbsolute'

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
            const response = await fetchAbsolute(`/orders/${orderId}`)
            if (!response.ok) {
                throw response
            }
            return await response.json()
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
            })}
        </div>
    )
}

export default OrderPage
