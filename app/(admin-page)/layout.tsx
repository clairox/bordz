import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
    title: 'Bordz Admin',
    description: 'Bordz Admin',
}

const RootLayout: React.FC<Readonly<React.PropsWithChildren>> = ({
    children,
}) => {
    return (
        <html lang="en">
            <body>
                <main>{children}</main>
            </body>
        </html>
    )
}

export default RootLayout
