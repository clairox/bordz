import fetchAbsolute from '@/lib/fetchAbsolute'
import { OrderResponse, OrderUpdateArgs } from '@/types/api'
import { buildPathWithParams } from '@/utils/helpers'

export const fetchOrder = async (id: string): Promise<OrderResponse> => {
    return await fetchAbsolute<OrderResponse>(`/orders/${id}`, {
        cache: 'no-cache',
    })
}

type FetchOrdersOptions = { customerId?: string } & FetchManyOptions

export const fetchOrders = async (
    options?: FetchOrdersOptions
): Promise<Page<OrderResponse>> => {
    const path = buildPathWithParams('/orders', options)
    return await fetchAbsolute<Page<OrderResponse>>(path, { cache: 'no-cache' })
}

export const updateOrder = async (
    orderId: string,
    args?: OrderUpdateArgs
): Promise<OrderResponse> => {
    return await fetchAbsolute<OrderResponse>(`/orders/${orderId}`, {
        method: 'PATCH',
        body: JSON.stringify(args),
    })
}

export const deleteOrders = async (ids: string[]): Promise<void> => {
    await fetchAbsolute('/orders', {
        method: 'DELETE',
        body: JSON.stringify({ ids }),
    })
}
