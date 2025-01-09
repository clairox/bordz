import fetchAbsolute from '@/lib/fetchAbsolute'

const deleteOrders = async (ids: string[]): Promise<void> => {
    await fetchAbsolute('/orders', {
        method: 'DELETE',
        body: JSON.stringify({ ids }),
    })
}

export default deleteOrders
