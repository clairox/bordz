import fetchAbsolute from '@/lib/fetchAbsolute'

const deleteOrders = async (ids: string[]): Promise<void> => {
    const response = await fetchAbsolute('/orders', {
        method: 'DELETE',
        body: JSON.stringify({ ids }),
    })
    if (!response.ok) {
        throw response
    }
}

export default deleteOrders
