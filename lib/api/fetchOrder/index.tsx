import fetchAbsolute from '@/lib/fetchAbsolute'

const fetchOrder = async (id: string): Promise<Order> => {
    const response = await fetchAbsolute(`/orders/${id}`, {
        cache: 'no-cache',
    })
    if (!response.ok) {
        throw response
    }
    return await response.json()
}

export default fetchOrder
