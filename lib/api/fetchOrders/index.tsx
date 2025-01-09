import fetchAbsolute from '@/lib/fetchAbsolute'
import { OrderResponse } from '@/types/api'
import { buildPathWithParams } from '@/utils/helpers'

type FetchOrdersOptions = { customerId?: string } & FetchManyOptions

const fetchOrders = async (
    options?: FetchOrdersOptions
): Promise<Page<OrderResponse>> => {
    const path = buildPathWithParams('/orders', options)
    const response = await fetchAbsolute(path, { cache: 'no-cache' })
    if (!response.ok) {
        throw response
    }
    return await response.json()
}

export default fetchOrders
