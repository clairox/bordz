import { AccountHeading, AccountSection } from '@/components/features/Account'
import { AddAddressView } from '@/components/features/Account/views'

const AddAddressPage = () => {
    return (
        <div>
            <AccountHeading>New Address</AccountHeading>
            <AccountSection>
                <AddAddressView />
            </AccountSection>
        </div>
    )
}

export default AddAddressPage
