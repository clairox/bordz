import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { Public_Sans } from 'next/font/google'

import { Header } from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { cn } from '@/utils'
import { fetchSessionData } from '@/utils/session'
import Providers from '@/context/providers'

import '@/styles/globals.css'

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
    let session: Session | undefined = undefined

    const sessionToken = cookies().get('session')?.value
    if (sessionToken) {
        session = await fetchSessionData(sessionToken)
    }

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
