import type { Metadata } from 'next'

import '@/styles/globals.css'
import Providers from '@/context/providers'
import Header from '@/components/Header'

export const metadata: Metadata = {
    title: 'Skate Lab | Bordz',
    description: 'Skate Lab | Bordz',
}

const RootLayout: React.FC<Readonly<React.PropsWithChildren>> = ({
    children,
}) => {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <Header />
                    <main>{children}</main>
                </Providers>
            </body>
        </html>
    )
}

export default RootLayout
