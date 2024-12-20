'use client'

import AccountHeading from '../_components/AccountHeading'
import AccountSection from '../_components/AccountSection'
import PersonalDetailsForm from '../_components/PersonalDetailsForm'
import { useAuth } from '@/context/AuthContext'
import { useCustomer } from '@/context/CustomerContext'

const PersonalDetailsPage = () => {
    const { data: auth } = useAuth()
    const { data: customer, isPending } = useCustomer()

    if (isPending) {
        return <div>Loading...</div>
    }

    if (!customer) {
        return <div>Something went wrong...</div>
    }

    return (
        <div>
            <AccountHeading>Personal Details</AccountHeading>
            <AccountSection>
                <AccountSection.Header>
                    Update personal details
                </AccountSection.Header>
                <AccountSection.Content>
                    <PersonalDetailsForm
                        defaultValues={{
                            email: auth!.email,
                            firstName: customer.firstName,
                            lastName: customer.lastName,
                            phone: customer.phone || '',
                        }}
                    />
                </AccountSection.Content>
            </AccountSection>
        </div>
    )
}

export default PersonalDetailsPage
