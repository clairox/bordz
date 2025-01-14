'use client'

import { AccountHeading, AccountSection } from '@/components/features/Account'
import { AddressDashboard } from '@/components/features/Addresses'

const AddressesPage = () => {
    return (
        <div>
            <AccountHeading>Addresses</AccountHeading>
            <AccountSection>
                <AccountSection.Content>
                    <AddressDashboard />
                </AccountSection.Content>
            </AccountSection>
        </div>
    )
}

export default AddressesPage
