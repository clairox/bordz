'use client'

import { useParams } from 'next/navigation'
import { useSuspenseQuery } from '@tanstack/react-query'

import { fetchCustomer } from '@/lib/api'
import UpdateCustomerForm from '@/components/Forms/UpdateCustomerForm'
import customerResponseToCustomer from '@/utils/helpers/customerResponseToCustomer'

const CustomerPage = () => {
    const { userId } = useParams<Record<string, string>>()
    const { data: customer } = useSuspenseQuery<Customer>({
        queryKey: ['customer', userId],
        queryFn: async () => {
            const data = await fetchCustomer(userId)
            return customerResponseToCustomer(data)
        },
    })

    return <UpdateCustomerForm customer={customer} />
}

export default CustomerPage
