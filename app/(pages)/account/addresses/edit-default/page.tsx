import { AccountHeading, AccountSection } from '@/components/features/Account'
import { UpdateDefaultAddressView } from '@/components/features/Account/views'

const EditDefaultAddressPage = () => {
    return (
        <div>
            <AccountHeading>Update default address</AccountHeading>
            <AccountSection>
                <UpdateDefaultAddressView />
            </AccountSection>
        </div>
    )
}

export default EditDefaultAddressPage
