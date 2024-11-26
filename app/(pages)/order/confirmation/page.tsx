import { redirect } from 'next/navigation'

import PriceRepr from '@/components/PriceRepr'
import fetchAbsolute from '@/lib/fetchAbsolute'
import { getQueryClient } from '@/lib/queryClient'

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
            try {
                const res = await fetchAbsolute(`/orders/${orderId}`)

                if (!res.ok) {
                    throw res
                }

                return await res.json()
            } catch (error) {
                throw error
            }
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
            <p>
                Total: <PriceRepr value={order.total} />
            </p>
        </div>
    )
}

export default CheckoutCompletePage
