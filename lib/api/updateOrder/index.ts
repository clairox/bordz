import fetchAbsolute from '@/lib/fetchAbsolute'

// TODO: PUT (?)
const updateOrder = async (
    orderId: string,
    args?: UpdateOrderArgs
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
