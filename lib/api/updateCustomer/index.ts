import fetchAbsolute from '@/lib/fetchAbsolute'
import { CustomerResponse, CustomerUpdateArgs } from '@/types/api'
import customerResponseToCustomer from '@/utils/helpers/customerResponseToCustomer'

const updateCustomer = async (
    userId: string,
    args: CustomerUpdateArgs
): Promise<Customer> => {
    const response = await fetchAbsolute(`/customers/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify(args),
    })
    if (!response.ok) {
        throw response
    }
    const customer = (await response.json()) as CustomerResponse
    return customerResponseToCustomer(customer)
}

export default updateCustomer
