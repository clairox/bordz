'use client'

import { useParams } from 'next/navigation'
import { useSuspenseQuery } from '@tanstack/react-query'

import { fetchCustomer } from '@/lib/api'
import UpdateCustomerForm from '@/components/forms/UpdateCustomerForm'
import { mapCustomerResponseToCustomer } from '@/utils/conversions'

const CustomerPage = () => {
    const { userId } = useParams<Record<string, string>>()
    const { data: customer } = useSuspenseQuery<Customer>({
        queryKey: ['customer', userId],
        queryFn: async () => {
            const data = await fetchCustomer(userId)
            return mapCustomerResponseToCustomer(data)
        },
    })

    return <UpdateCustomerForm customer={customer} />
}

export default CustomerPage
