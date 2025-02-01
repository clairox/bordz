import { redirect } from 'next/navigation'

import { fetchOrder } from '@/lib/api'
import { mapOrderResponseToOrder } from '@/utils/conversions'
import { OrderConfirmationView } from '@/components/features/Orders'

type OrderConfirmationPageProps = {
    searchParams: { order: string }
}

const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = async ({
    searchParams,
}) => {
    const { order: orderId } = searchParams

    if (!orderId) {
        redirect('/')
    }

    const orderResponse = await fetchOrder(orderId)
    const order = mapOrderResponseToOrder(orderResponse)

    if (!order) {
        redirect('/')
    }

    return (
        <div>
            <div className="mb-4">
                <h1>Thank you for your order!</h1>
                <p>Order No: {order.id}</p>
            </div>
            <OrderConfirmationView order={order} />
        </div>
    )
}

export default OrderConfirmationPage
