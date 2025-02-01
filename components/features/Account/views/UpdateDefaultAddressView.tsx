'use client'

import UpdateDefaultAddressForm from '@/components/forms/UpdateDefaultAddressForm'
import { useSessionCustomer } from '@/hooks/session'

export const UpdateDefaultAddressView = () => {
    const { data: customer, status: customerStatus } = useSessionCustomer()

    if (customerStatus === 'pending') {
        return <div>Loading...</div>
    }

    if (!customer || customer.addresses.length === 0) {
        return <div>No addresses.</div>
    }

    const defaultAddress = customer.addresses.find(
        ({ id }) => id === customer.defaultAddress?.id
    )
    const otherAddresses = customer.addresses.filter(
        ({ id }) => id !== defaultAddress?.id
    )
    const sortedAddresses = otherAddresses
    if (defaultAddress) {
        otherAddresses.unshift(defaultAddress)
    }

    return (
        <div className="p-8 w-[500px] border-r border-gray-400">
            <UpdateDefaultAddressForm
                addresses={sortedAddresses}
                defaultAddressId={customer.defaultAddress!.id}
            />
        </div>
    )
}
