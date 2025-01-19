'use client'

import { useCustomer } from '@/context/CustomerContext'
import { AddressManagementList, DefaultAddressCard } from '.'

export const AddressDashboard = () => {
    const { data: customer } = useCustomer()

    return (
        <div className="flex mb-3 px-8 pb-4">
            <DefaultAddressCard defaultAddress={customer!.defaultAddress} />
            <AddressManagementList addresses={customer!.addresses} />
        </div>
    )
}

const Fallback = () => <div>Loading...</div>
