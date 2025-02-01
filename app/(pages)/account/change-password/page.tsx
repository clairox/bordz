import { AccountHeading, AccountSection } from '@/components/features/Account'
import { ChangePasswordView } from '@/components/features/Account/views'

const ChangePasswordPage = () => {
    return (
        <div>
            <AccountHeading>Change Password</AccountHeading>
            <AccountSection>
                <ChangePasswordView />
            </AccountSection>
        </div>
    )
}

export default ChangePasswordPage
