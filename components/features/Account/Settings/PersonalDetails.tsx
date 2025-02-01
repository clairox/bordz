'use client'

import { useSessionCustomer } from '@/hooks/session'

export const PersonalDetails = () => {
    const { data: customer } = useSessionCustomer()

    if (!customer) {
        return <div>Loading...</div>
    }

    return (
        <div className="px-8">
            <div className="mb-3">
                <p className="font-semibold">Name:</p>
                <p>{customer?.displayName}</p>
            </div>
            <div className="mb-3">
                <p className="font-semibold">Email:</p>
                <p>{customer?.email}</p>
            </div>
            <div className="mb-3">
                <p className="font-semibold">Phone:</p>
                <p>{customer?.phone}</p>
            </div>
        </div>
    )
}
