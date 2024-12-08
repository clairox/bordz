'use client'

import { useAuthQuery } from '@/context/AuthContext'
import AccountHeading from '../_components/AccountHeading'
import AccountSection from '../_components/AccountSection'
import { AddressForm } from './_components'
import { useAddress } from './_hooks'

const AddressesPage = () => {
    const {
        customer: { data: customer, isSuccess: customerLoaded },
    } = useAuthQuery()

    const {
        data: address,
        error,
        isPending,
    } = useAddress(customer?.defaultAddressId, customerLoaded)

    if (error) {
        return <div>Something went wrong</div>
    }

    if (isPending) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <AccountHeading>Addresses</AccountHeading>
            <AccountSection>
                <AccountSection.Header>Update address</AccountSection.Header>
                <AccountSection.Content>
                    <AddressForm existingAddress={address} />
                </AccountSection.Content>
            </AccountSection>
        </div>
    )
}

export default AddressesPage
