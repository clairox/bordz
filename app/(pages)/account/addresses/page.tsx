'use client'

import { useAuthQuery } from '@/context/AuthContext'
import AccountHeading from '../_components/AccountHeading'
import AccountSection from '../_components/AccountSection'
import { AddressForm } from './_components'

const AddressesPage = () => {
    const {
        customer: { data: customer },
    } = useAuthQuery()

    return (
        <div>
            <AccountHeading>Addresses</AccountHeading>
            <AccountSection>
                <AccountSection.Header>Update address</AccountSection.Header>
                <AccountSection.Content>
                    <AddressForm existingAddress={customer?.defaultAddress} />
                </AccountSection.Content>
            </AccountSection>
        </div>
    )
}

export default AddressesPage
