'use client'

import AccountHeading from '@/components/AccountHeading'
import AccountSection from '@/components/AccountSection'
import AddressesView from '@/components/AddressesView'
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
