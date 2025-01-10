import fetchAbsolute from '@/lib/fetchAbsolute'
import {
    CustomerCreateArgs,
    CustomerResponse,
    CustomerUpdateArgs,
} from '@/types/api'
import { buildPathWithParams } from '@/utils/helpers'

export const fetchCustomer = async (
    userId: string
): Promise<CustomerResponse> => {
    return await fetchAbsolute<CustomerResponse>(`/customers/${userId}`)
}

export const fetchCustomers = async (options?: FetchManyOptions) => {
    const path = buildPathWithParams('/customers', options)
    return await fetchAbsolute<Page<CustomerResponse>>(path)
}

export const createCustomer = async (
    args: CustomerCreateArgs
): Promise<CustomerResponse> => {
    return await fetchAbsolute<CustomerResponse>('/customers', {
        method: 'POST',
        body: JSON.stringify(args),
    })
}

export const updateCustomer = async (
    userId: string,
    args: CustomerUpdateArgs
): Promise<CustomerResponse> => {
    return await fetchAbsolute<CustomerResponse>(`/customers/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify(args),
    })
}

export const deleteCustomer = async (userId: string): Promise<void> => {
    await fetchAbsolute(`/customers/${userId}`, {
        method: 'DELETE',
    })
}

// TODO: Delete related users
export const deleteCustomers = async (ids: string[]): Promise<void> => {
    await fetchAbsolute('/customers', {
        method: 'DELETE',
        body: JSON.stringify({ ids }),
    })
}
