import fetchAbsolute from '@/lib/fetchAbsolute'

const deleteCustomers = async (ids: string[]): Promise<void> => {
    const response = await fetchAbsolute('/customers', {
        method: 'DELETE',
        body: JSON.stringify({ ids }),
    })
    if (!response.ok) {
        throw response
    }
}

export default deleteCustomers
