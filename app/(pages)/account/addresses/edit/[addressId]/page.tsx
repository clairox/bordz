import { AccountHeading, AccountSection } from '@/components/features/Account'
import { UpdateAddressView } from '@/components/features/Account/views'

const EditAddressPage = () => {
    return (
        <div>
            <AccountHeading>Edit Address</AccountHeading>
            <AccountSection>
                <UpdateAddressView />
            </AccountSection>
        </div>
    )
}

export default EditAddressPage
