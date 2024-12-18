'use client'

import AccountHeading from '../_components/AccountHeading'
import AccountSection from '../_components/AccountSection'
import ChangePasswordForm from '../_components/ChangePasswordForm'
import { useCustomer } from '@/context/CustomerContext'

const ChangePasswordPage = () => {
    const { isPending } = useCustomer()

    if (isPending) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <AccountHeading>Change Password</AccountHeading>
            <AccountSection>
                <AccountSection.Header>Change password</AccountSection.Header>
                <AccountSection.Content>
                    <ChangePasswordForm />
                </AccountSection.Content>
            </AccountSection>
        </div>
    )
}

export default ChangePasswordPage
