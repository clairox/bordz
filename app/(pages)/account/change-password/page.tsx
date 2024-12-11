'use client'

import { useAuthQuery } from '@/context/AuthContext'
import AccountHeading from '../_components/AccountHeading'
import AccountSection from '../_components/AccountSection'
import ChangePasswordForm from '../_components/ChangePasswordForm'

const ChangePasswordPage = () => {
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
                    <ChangePasswordForm />
                </AccountSection.Content>
            </AccountSection>
        </div>
    )
}

export default ChangePasswordPage
