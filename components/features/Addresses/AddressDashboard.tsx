'use client'

import { useCustomer } from '@/context/CustomerContext'
import { AddressManagementList, DefaultAddressCard } from '.'

export const AddressDashboard = () => {
    const { data: customer, error, isPending } = useCustomer()

    if (error) {
        throw error
    }

    if (isPending) {
        return <Fallback />
    }

    return (
        <div className="flex mb-3">
            <DefaultAddressCard defaultAddress={customer!.defaultAddress} />
            <AddressManagementList addresses={customer!.addresses} />
        </div>
    )
}

const Fallback = () => <div>Loading...</div>
