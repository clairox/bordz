import type { Metadata } from 'next'
import { Public_Sans } from 'next/font/google'

import '@/styles/globals.css'
import { Header } from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { cn } from '@/utils'
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
    return (
        <Providers>
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
