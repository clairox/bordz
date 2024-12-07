import { Suspense } from 'react'
import type { Metadata } from 'next'

import '@/styles/globals.css'
import AccountSidebar from '@/app/(pages)/account/_components/AccountSidebar'

export const metadata: Metadata = {
    title: 'Account | Bordz',
    description: 'Account | Bordz',
}

const AccountLayout: React.FC<Readonly<React.PropsWithChildren>> = ({
    children,
}) => {
    return (
        <div className="grid grid-cols-12">
            <div className="col-span-3">
                <AccountSidebar />
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <main className="col-span-9 h-full">{children}</main>
            </Suspense>
        </div>
    )
}

export default AccountLayout
