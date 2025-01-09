import fetchAbsolute from '@/lib/fetchAbsolute'
import { OrderResponse, OrderUpdateArgs } from '@/types/api'
import orderResponseToOrder from '@/utils/helpers/orderResponseToOrder'

// TODO: PUT (?)
const updateOrder = async (
    orderId: string,
    args?: OrderUpdateArgs
): Promise<Order> => {
    const data = await fetchAbsolute<OrderResponse>(`/orders/${orderId}`, {
        method: 'PATCH',
        body: JSON.stringify(args),
    })
    return orderResponseToOrder(data)
}

export default updateOrder
