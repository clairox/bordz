import type { Metadata } from 'next'
import '@/styles/globals.css'
import Header from '@/components/Header'

export const metadata: Metadata = {
    title: 'Complete Builder | Bordz',
    description: 'Complete Builder | Bordz',
}

const RootLayout: React.FC<Readonly<React.PropsWithChildren>> = ({
    children,
}) => {
    return (
        <html lang="en">
            <body>
                <Header />
                <main>{children}</main>
            </body>
        </html>
    )
}

export default RootLayout
