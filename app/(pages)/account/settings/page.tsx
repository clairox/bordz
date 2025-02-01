import { AccountHeading } from '@/components/features/Account'
import {
    AddressesSummarySection,
    DeleteAccountSection,
    PersonalDetailsSummarySection,
} from '@/components/features/Account/Settings'

const SettingsPage: React.FC = () => {
    return (
        <div>
            <AccountHeading>Settings</AccountHeading>
            <PersonalDetailsSummarySection />
            <AddressesSummarySection />
            <DeleteAccountSection />
        </div>
    )
}

export default SettingsPage
