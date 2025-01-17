'use client'

import { useRouter } from 'next/navigation'

import {
    AccountHeading,
    AccountSection as Section,
} from '@/components/features/Account'
import { AddressDashboard } from '@/components/features/Addresses'
import { useAuth } from '@/context/AuthContext'
import { useCustomer } from '@/context/CustomerContext'
import { Button } from '@/components/ui/Button'

const SettingsPage: React.FC = () => {
    const { data: user } = useAuth()
    const { data: customer, isPending: isCustomerPending } = useCustomer()

    const router = useRouter()

    if (isCustomerPending) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <AccountHeading>Settings</AccountHeading>
            <Section>
                <Section.Header>
                    <Section.Header.Title>
                        Personal Details
                    </Section.Header.Title>
                    <Section.Header.ActionLink href="/account/personal-details">
                        Edit
                    </Section.Header.ActionLink>
                </Section.Header>
                <Section.Content>
                    <div className="px-8">
                        <div className="mb-3">
                            <p className="font-semibold">Name:</p>
                            <p>{customer?.displayName}</p>
                        </div>
                        <div className="mb-3">
                            <p className="font-semibold">Email:</p>
                            <p>{user?.email}</p>
                        </div>
                        <div className="mb-3">
                            <p className="font-semibold">Phone:</p>
                            <p>{customer?.phone}</p>
                        </div>
                    </div>
                </Section.Content>
            </Section>
            <Section>
                <Section.Header>
                    <Section.Header.Title>Addresses</Section.Header.Title>
                </Section.Header>
                <Section.Content>
                    <AddressDashboard />
                </Section.Content>
            </Section>
            <Section>
                <Section.Header>
                    <Section.Header.Title>Delete Account</Section.Header.Title>
                </Section.Header>
                <Section.Content>
                    <div className="mb-3 px-8 pb-4">
                        <Button
                            onClick={() =>
                                router.push('/account/delete-account')
                            }
                            className="w-fit"
                        >
                            Delete Account
                        </Button>
                    </div>
                </Section.Content>
            </Section>
        </div>
    )
}

export default SettingsPage
