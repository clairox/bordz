'use client'

import { AccountHeading, AccountSection } from '@/components/features/Account'
import { AddressesView } from '@/components/features/Addresses'
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
