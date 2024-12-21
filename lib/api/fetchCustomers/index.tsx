import fetchAbsolute from '@/lib/fetchAbsolute'
import { buildPathWithParams } from '@/utils/helpers'

const fetchCustomers = async (options?: FetchManyOptions) => {
    const path = buildPathWithParams('/customers', options)
    const response = await fetchAbsolute(path)
    if (!response.ok) {
        throw response
    }
    return await response.json()
}

export default fetchCustomers
