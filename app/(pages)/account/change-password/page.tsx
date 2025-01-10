'use client'

import AccountHeading from '@/components/AccountHeading'
import AccountSection from '@/components/AccountSection'
import ChangePasswordForm from '@/components/Forms/ChangePasswordForm'
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
