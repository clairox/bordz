import fetchAbsolute from '@/lib/fetchAbsolute'

// TODO: Delete related users
const deleteCustomers = async (ids: string[]): Promise<void> => {
    await fetchAbsolute('/customers', {
        method: 'DELETE',
        body: JSON.stringify({ ids }),
    })
}

export default deleteCustomers
