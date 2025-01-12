import type { Metadata } from 'next'
import { Public_Sans } from 'next/font/google'

import '@/styles/globals.css'

import Providers from '@/context/providers'
import { Header } from '@/components/layout/Header'
import { cn } from '@/utils'

const publicSans = Public_Sans({
    subsets: ['latin'],
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'Skate Lab | Bordz',
    description: 'Skate Lab | Bordz',
}

const RootLayout: React.FC<Readonly<React.PropsWithChildren>> = ({
    children,
}) => {
    return (
        <html lang="en">
            <body
                className={cn(
                    'relative h-screen font-light',
                    publicSans.className
                )}
            >
                <Providers>
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
