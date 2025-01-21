import type { Metadata } from 'next'

import Providers from '@/context/providers'

import '@/styles/globals.css'
import { createClient } from '@/lib/supabase/server'
import { initializeSession } from '@/utils/session'
import { cookies } from 'next/headers'

export const metadata: Metadata = {
    title: 'Checkout | Bordz',
    description: 'Checkout | Bordz',
}

const CheckoutLayout: React.FC<Readonly<React.PropsWithChildren>> = async ({
    children,
}) => {
    const supabase = createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()
    const initialAppState = await initializeSession(user, cookies())

    return (
        <html lang="en">
            <body>
                <Providers initialState={initialAppState}>
                    <main className="pt-14">{children}</main>
                </Providers>
            </body>
        </html>
    )
}

export default CheckoutLayout
