import fetchAbsolute from '@/lib/fetchAbsolute'
import { CustomerResponse } from '@/types/api'
import customerResponseToCustomer from '@/utils/helpers/customerResponseToCustomer'

const fetchCustomer = async (userId: string): Promise<Customer> => {
    const response = await fetchAbsolute(`/customers/${userId}`)
    if (!response.ok) {
        throw response
    }
    const customer = (await response.json()) as CustomerResponse
    return customerResponseToCustomer(customer)
}

export default fetchCustomer
