import fetchAbsolute from '@/lib/fetchAbsolute'
import { OrderResponse } from '@/types/api'

const fetchOrder = async (id: string): Promise<OrderResponse> => {
    const response = await fetchAbsolute(`/orders/${id}`, {
        cache: 'no-cache',
    })
    if (!response.ok) {
        throw response
    }
    return await response.json()
}

export default fetchOrder
