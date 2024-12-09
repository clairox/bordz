'use client'

import { useAuthQuery } from '@/context/AuthContext'
import AccountHeading from '../_components/AccountHeading'
import AccountSection from '../_components/AccountSection'
import AddressesView from '../_components/AddressesView'

const AddressesPage = () => {
    const {
        customer: { data: customer, isPending },
    } = useAuthQuery()

    if (isPending) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <AccountHeading>Addresses</AccountHeading>
            <AccountSection>
                <AccountSection.Header>Update address</AccountSection.Header>
                <AccountSection.Content>
                    <AddressesView
                        defaultAddress={customer?.defaultAddress?.address}
                        addresses={customer?.addresses}
                    />
                </AccountSection.Content>
            </AccountSection>
        </div>
    )
}

export default AddressesPage
