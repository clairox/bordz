import fetchAbsolute from '@/lib/fetchAbsolute'
import { OrderResponse } from '@/types/api'
import { buildPathWithParams } from '@/utils/helpers'

type FetchOrdersOptions = { customerId?: string } & FetchManyOptions

const fetchOrders = async (
    options?: FetchOrdersOptions
): Promise<Page<OrderResponse>> => {
    const path = buildPathWithParams('/orders', options)
    return await fetchAbsolute<Page<OrderResponse>>(path, { cache: 'no-cache' })
}

export default fetchOrders
