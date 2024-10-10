import type { Metadata } from 'next'
import { Public_Sans } from 'next/font/google'
import '@/styles/globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { cn } from '@/utils/helpers'
import Providers from '@/context/providers'

const publicSans = Public_Sans({
    subsets: ['latin'],
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'Bordz',
    description: 'Bordz',
}

const RootLayout: React.FC<Readonly<React.PropsWithChildren>> = ({
    children,
}) => {
    return (
        <Providers>
            <html lang="en">
                <body className={cn('font-light', publicSans.className)}>
                    <Header />
                    <main>{children}</main>
                    <Footer />
                </body>
            </html>
        </Providers>
    )
}

export default RootLayout
