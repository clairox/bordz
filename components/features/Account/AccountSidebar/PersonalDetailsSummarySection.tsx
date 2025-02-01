import { AccountSection as Section } from '@/components/features/Account'
import { PersonalDetails } from '../Settings/PersonalDetails'

export const PersonalDetailsSummarySection = () => {
    return (
        <Section>
            <Section.Header>
                <Section.Header.Title>Personal Details</Section.Header.Title>
                <Section.Header.ActionLink href="/account/personal-details">
                    Edit
                </Section.Header.ActionLink>
            </Section.Header>
            <Section.Content>
                <PersonalDetails />
            </Section.Content>
        </Section>
    )
}
