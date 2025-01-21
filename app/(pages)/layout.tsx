import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { Public_Sans } from 'next/font/google'

import '@/styles/globals.css'
import { Header } from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { cn } from '@/utils'
import { initializeSession } from '@/utils/session'
import Providers from '@/context/providers'
import { createClient } from '@/lib/supabase/server'

const publicSans = Public_Sans({
    subsets: ['latin'],
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'Bordz',
    description: 'Bordz',
}

const RootLayout: React.FC<Readonly<React.PropsWithChildren>> = async ({
    children,
}) => {
    const supabase = createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()
    const initialAppState = await initializeSession(user, cookies())

    return (
        <Providers initialState={initialAppState}>
            <html lang="en">
                <body className={cn('font-light', publicSans.className)}>
                    <Header />
                    <main className="pt-14">{children}</main>
                    <Footer />
                </body>
            </html>
        </Providers>
    )
}

export default RootLayout
