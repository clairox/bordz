import type { Metadata } from 'next'

import '@/styles/globals.css'
import Providers from '@/context/providers'
import Header from '@/components/layout/Header'

export const metadata: Metadata = {
    title: 'Skate Lab | Bordz',
    description: 'Skate Lab | Bordz',
}

const RootLayout: React.FC<Readonly<React.PropsWithChildren>> = ({
    children,
}) => {
    return (
        <html lang="en">
            <body className="relative h-screen">
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
