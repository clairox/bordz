import { redirect } from 'next/navigation'

import PriceRepr from '@/components/PriceRepr'
import fetchAbsolute from '@/lib/fetchAbsolute'
import { getQueryClient } from '@/lib/queryClient'
import { fetchOrder } from '@/lib/api'
import orderResponseToOrder from '@/utils/helpers/orderResponseToOrder'

const queryClient = getQueryClient()

type CheckoutCompletePageProps = {
    searchParams: { order: string }
}

const CheckoutCompletePage: React.FC<CheckoutCompletePageProps> = async ({
    searchParams,
}) => {
    const { order: orderId } = searchParams
    if (!orderId) {
        redirect('/')
    }

    const order = await queryClient.fetchQuery<Order>({
        queryKey: ['order', orderId],
        queryFn: async () => {
            const response = await fetchOrder(orderId)
            return orderResponseToOrder(response)
        },
    })

    if (!order) {
        redirect('/')
    }

    return (
        <div>
            <h1>Thank you for your order!</h1>
            <p>Order No: {order.id}</p>
            <div>
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
            <p>
                Total: <PriceRepr value={order.total} />
            </p>
        </div>
    )
}

export default CheckoutCompletePage
