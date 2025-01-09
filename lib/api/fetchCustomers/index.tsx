import fetchAbsolute from '@/lib/fetchAbsolute'
import { CustomerResponse } from '@/types/api'
import { buildPathWithParams } from '@/utils/helpers'

const fetchCustomers = async (options?: FetchManyOptions) => {
    const path = buildPathWithParams('/customers', options)
    return await fetchAbsolute<Page<CustomerResponse>>(path)
}

export default fetchCustomers
