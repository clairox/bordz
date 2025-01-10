'use client'

import { useCustomer } from '@/context/CustomerContext'
import DeleteAccountForm from '@/components/forms/DeleteAccountForm'
import { AccountHeading, AccountSection } from '@/components/features/Account'

const DeleteAccountPage = () => {
    const { isPending } = useCustomer()

    if (isPending) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <AccountHeading>Delete Account</AccountHeading>
            <AccountSection>
                <AccountSection.Header>Delete account</AccountSection.Header>
                <AccountSection.Content>
                    <DeleteAccountForm />
                </AccountSection.Content>
            </AccountSection>
        </div>
    )
}

export default DeleteAccountPage
