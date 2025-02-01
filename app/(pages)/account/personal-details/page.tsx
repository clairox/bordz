import {
    AccountHeading,
    AccountSection,
    PersonalDetailsView,
} from '@/components/features/Account'
import { PersonalDetailsView } from '@/components/features/Account/views'

const PersonalDetailsPage = () => {
    return (
        <div>
            <AccountHeading>Personal Details</AccountHeading>
            <AccountSection>
                <PersonalDetailsView />
            </AccountSection>
        </div>
    )
}

export default PersonalDetailsPage
