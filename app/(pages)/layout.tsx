import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { Public_Sans } from 'next/font/google'

import '@/styles/globals.css'
import { Header } from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { cn } from '@/utils'
import { initializeSession } from '@/utils/session'
import Providers from '@/context/providers'

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
    const session = await initializeSession(cookies())

    return (
        <Providers session={session}>
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
