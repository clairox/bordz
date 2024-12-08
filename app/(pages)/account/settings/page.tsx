'use client'

import { useRouter } from 'next/navigation'

import { useAuthQuery } from '@/context/AuthContext'
import AccountHeading from '../_components/AccountHeading'
import { default as Section } from '../_components/AccountSection'
import { useQuery } from '@tanstack/react-query'
import fetchAbsolute from '@/lib/fetchAbsolute'

const SettingsPage: React.FC = () => {
    const {
        auth: { data: auth, status: authStatus },
        customer: { data: customer, status: customerStatus },
    } = useAuthQuery()

    const router = useRouter()

    if (authStatus === 'pending' || customerStatus === 'pending') {
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
                        <p>{auth?.email}</p>
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
                    <Section.Header.ActionLink href="/account/addresses">
                        Edit
                    </Section.Header.ActionLink>
                </Section.Header>
                <Section.Content>
                    {customer?.defaultAddressId ? (
                        <div className="mb-3">
                            <p className="font-semibold">Address:</p>
                            <AddressDisplay
                                addressId={customer.defaultAddressId}
                            />
                        </div>
                    ) : (
                        <p>No home address saved.</p>
                    )}
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

type AddressDisplayProps = {
    addressId: string
}

const AddressDisplay: React.FC<AddressDisplayProps> = ({ addressId }) => {
    const {
        data: address,
        error,
        isPending,
    } = useQuery<Address>({
        queryKey: ['address', addressId],
        queryFn: async () => {
            const response = await fetchAbsolute(`/addresses/${addressId}`)
            if (!response.ok) {
                throw response
            }
            return await response.json()
        },
    })

    if (error) {
        return <div>Something went wrong</div>
    }

    if (isPending) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <p>{address.line1}</p>
            {address.line2 && <p>{address.line2}</p>}
            <p>
                {address.city}, {address.state} {address.postalCode}
            </p>
            <p>{address.countryCode}</p>
        </div>
    )
}

export default SettingsPage
