'use client'

import { useSessionCustomer } from '@/hooks/session'

export const AccountSidebarHeader = () => {
    const customer = useSessionCustomer()

    return (
        <div className="px-6 pt-6 pb-4 border-b border-gray-400 bg-white">
            <h1 className="mb-2 text-2xl">Your Account</h1>
            <p className="text-xl">
                Hello, {customer && customer.data?.firstName + '!'}
            </p>
        </div>
    )
}
