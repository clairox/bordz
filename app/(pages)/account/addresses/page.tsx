'use client'

import AccountHeading from '../_components/AccountHeading'
import AccountSection from '../_components/AccountSection'
import AddressesView from '../_components/AddressesView'
import { useCustomer } from '@/context/CustomerContext'

const AddressesPage = () => {
    const { data: customer, isPending } = useCustomer()

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
                        defaultAddress={customer?.defaultAddress}
                        addresses={customer?.addresses}
                    />
                </AccountSection.Content>
            </AccountSection>
        </div>
    )
}

export default AddressesPage
