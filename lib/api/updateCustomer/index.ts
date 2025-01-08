import fetchAbsolute from '@/lib/fetchAbsolute'

const updateCustomer = async (userId: string, args: UpdateCustomerArgs) => {
    const response = await fetchAbsolute(`/customers/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify(args),
    })
    if (!response.ok) {
        throw response
    }
    return await response.json()
}

export default updateCustomer
