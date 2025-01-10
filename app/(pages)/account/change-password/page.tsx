'use client'

import { AccountHeading, AccountSection } from '@/components/features/Account'
import ChangePasswordForm from '@/components/forms/ChangePasswordForm'
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
