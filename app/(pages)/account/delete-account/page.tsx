'use client'

import { useCustomer } from '@/context/CustomerContext'
import DeleteAccountForm from '../_components/DeleteAccountForm'
import AccountSection from '../_components/AccountSection'
import AccountHeading from '../_components/AccountHeading'

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
