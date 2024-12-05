import type { Metadata } from 'next'
import '@/styles/globals.css'
import Providers from './adminPageProviders'
import LayoutContent from './layoutContent'

export const metadata: Metadata = {
    title: 'Bordz Admin',
    description: 'Bordz Admin',
}

const RootLayout: React.FC<Readonly<React.PropsWithChildren>> = async ({
    children,
}) => {
    return (
        <html lang="en">
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}

export default RootLayout
