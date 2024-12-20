'use client'

import { useRouter } from 'next/navigation'

import AccountHeading from '../_components/AccountHeading'
import { default as Section } from '../_components/AccountSection'
import AddressesView from '../_components/AddressesView'
import { useAuth } from '@/context/AuthContext'
import { useCustomer } from '@/context/CustomerContext'

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
                </Section.Content>
            </Section>
            <Section>
                <Section.Header>
                    <Section.Header.Title>Addresses</Section.Header.Title>
                </Section.Header>
                <Section.Content>
                    <AddressesView
                        defaultAddress={customer?.defaultAddress?.address}
                        addresses={customer?.addresses}
                    />
                </Section.Content>
            </Section>
            <Section>
                <Section.Header>
                    <Section.Header.Title>Delete Account</Section.Header.Title>
                </Section.Header>
                <Section.Content>
                    <div className="mb-3">
                        <button
                            onClick={() =>
                                router.push('/account/delete-account')
                            }
                        >
                            Delete Account
                        </button>
                    </div>
                </Section.Content>
            </Section>
        </div>
    )
}

export default SettingsPage
