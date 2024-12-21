import fetchAbsolute from '@/lib/fetchAbsolute'
import { buildPathWithParams } from '@/utils/helpers'

type FetchOrdersOptions = {
    size?: number
    page?: number
    orderBy?: number
}

const fetchOrders = async (options?: FetchOrdersOptions) => {
    const path = buildPathWithParams('/orders', options)
    const response = await fetchAbsolute(path)
    if (!response.ok) {
        throw response
    }
    return await response.json()
}

export default fetchOrders
