import { AccountSection as Section } from '@/components/features/Account'
import { AddressDashboard } from '../../Addresses'

export const AddressesSummarySection = () => {
    return (
        <Section>
            <Section.Header>
                <Section.Header.Title>Addresses</Section.Header.Title>
            </Section.Header>
            <Section.Content>
                <AddressDashboard />
            </Section.Content>
        </Section>
    )
}
