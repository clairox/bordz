'use client'

import { useParams } from 'next/navigation'
import { useSuspenseQuery } from '@tanstack/react-query'

import { fetchCustomer } from '@/lib/api'
import UpdateCustomerForm from '@/components/Forms/UpdateCustomerForm'

const CustomerPage = () => {
    const { userId } = useParams<Record<string, string>>()
    const { data: customer } = useSuspenseQuery<Customer>({
        queryKey: ['customer', userId],
        queryFn: () => fetchCustomer(userId),
    })

    return <UpdateCustomerForm customer={customer} />
}

export default CustomerPage
