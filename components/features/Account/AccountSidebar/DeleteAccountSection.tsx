import {
    DeleteAccountDialogButton,
    AccountSection as Section,
} from '@/components/features/Account'

export const DeleteAccountSection = () => {
    return (
        <Section>
            <Section.Header>
                <Section.Header.Title>Delete Account</Section.Header.Title>
            </Section.Header>
            <Section.Content>
                <div className="mb-3 px-8 pb-4">
                    <DeleteAccountDialogButton />
                </div>
            </Section.Content>
        </Section>
    )
}
