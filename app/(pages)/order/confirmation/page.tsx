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
