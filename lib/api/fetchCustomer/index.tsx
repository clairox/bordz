import fetchAbsolute from '@/lib/fetchAbsolute'

const fetchCustomer = async (id: string) => {
    const response = await fetchAbsolute(`/customers/${id}`)
    if (!response.ok) {
        throw response
    }
    return await response.json()
}

export default fetchCustomer
