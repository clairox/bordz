import { useAuthQuery } from '@/context/AuthContext'
import AccountHeading from '../_components/AccountHeading'
import AccountSection from '../_components/AccountSection'
import PersonalDetailsForm from '../_components/PersonalDetailsForm'

const PersonalDetailsPage = () => {
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
                    <PersonalDetailsForm />
                </AccountSection.Content>
            </AccountSection>
        </div>
    )
}

export default PersonalDetailsPage
