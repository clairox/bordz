'use client'

import { useCustomer } from '@/context/CustomerContext'
import { AccountHeading, AccountSection } from '@/components/features/Account'
import CreateAddressForm from '@/components/forms/CreateAddressForm'

const AddAddressPage = () => {
    const { data: customer, error, isPending } = useCustomer()

    if (error) {
        throw error
    }

    if (isPending) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <AccountHeading>New Address</AccountHeading>
            <AccountSection>
                <CreateAddressForm ownerId={customer!.id} />
            </AccountSection>
        </div>
    )
}

export default AddAddressPage
