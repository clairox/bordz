import type { Metadata } from 'next'

import '@/styles/globals.css'
import AccountSidebar from '@/components/AccountSidebar'
import { Fragment } from 'react'

export const metadata: Metadata = {
    title: 'Account | Bordz',
    description: 'Account | Bordz',
}

const AccountLayout: React.FC<Readonly<React.PropsWithChildren>> = ({
    children,
}) => {
    return (
        <Fragment>
            <AccountSidebar />
            <main>{children}</main>
        </Fragment>
    )
}

export default AccountLayout
