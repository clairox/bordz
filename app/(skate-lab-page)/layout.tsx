import type { Metadata } from 'next'
import { Public_Sans } from 'next/font/google'

import '@/styles/globals.css'

import Providers from '@/context/providers'
import { Header } from '@/components/layout/Header'
import { cn } from '@/utils'
import { createClient } from '@/lib/supabase/server'
import { initializeSession } from '@/utils/session'
import { cookies } from 'next/headers'

const publicSans = Public_Sans({
    subsets: ['latin'],
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'Skate Lab | Bordz',
    description: 'Skate Lab | Bordz',
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
        <html lang="en">
            <body
                className={cn(
                    'relative h-screen font-light',
                    publicSans.className
                )}
            >
                <Providers initialState={initialAppState}>
                    <Header />
                    <main className="pt-14 h-full overflow-hidden">
                        {children}
                    </main>
                </Providers>
            </body>
        </html>
    )
}

export default RootLayout
