import fetchAbsolute from '@/lib/fetchAbsolute'
import { CustomerResponse, CustomerUpdateArgs } from '@/types/api'
import customerResponseToCustomer from '@/utils/helpers/customerResponseToCustomer'

const updateCustomer = async (
    userId: string,
    args: CustomerUpdateArgs
): Promise<Customer> => {
    const data = await fetchAbsolute<CustomerResponse>(`/customers/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify(args),
    })
    return customerResponseToCustomer(data)
}

export default updateCustomer
