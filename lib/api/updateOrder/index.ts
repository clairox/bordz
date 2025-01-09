import fetchAbsolute from '@/lib/fetchAbsolute'
import { OrderUpdateArgs } from '@/types/api'

// TODO: PUT (?)
const updateOrder = async (
    orderId: string,
    args?: OrderUpdateArgs
): Promise<Order> => {
    const response = await fetchAbsolute(`/orders/${orderId}`, {
        method: 'PATCH',
        body: JSON.stringify(args),
    })
    if (!response.ok) {
        throw response
    }
    return await response.json()
}

export default updateOrder
