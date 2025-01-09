import fetchAbsolute from '@/lib/fetchAbsolute'
import { CustomerResponse } from '@/types/api'
import customerResponseToCustomer from '@/utils/helpers/customerResponseToCustomer'

const fetchCustomer = async (userId: string): Promise<Customer> => {
    const data = await fetchAbsolute<CustomerResponse>(`/customers/${userId}`)
    return customerResponseToCustomer(data)
}

export default fetchCustomer
