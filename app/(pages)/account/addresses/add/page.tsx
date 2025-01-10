'use client'

import { useCustomer } from '@/context/CustomerContext'
import AddressForm from '@/components/Forms/AddressForm'

const AddAddressPage = () => {
    const { data: customer, error, isPending } = useCustomer()

    if (error) {
        throw error
    }

    if (isPending) {
        return <div>Loading...</div>
    }

    return <AddressForm ownerId={customer!.id} />
}

export default AddAddressPage
