import fetchAbsolute from '@/lib/fetchAbsolute'
import { OrderResponse } from '@/types/api'

const fetchOrder = async (id: string): Promise<OrderResponse> => {
    return await fetchAbsolute<OrderResponse>(`/orders/${id}`, {
        cache: 'no-cache',
    })
}

export default fetchOrder
