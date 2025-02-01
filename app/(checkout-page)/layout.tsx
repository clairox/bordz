import type { Metadata } from 'next'

import Providers from '@/context/providers'

import '@/styles/globals.css'

export const metadata: Metadata = {
    title: 'Checkout | Bordz',
    description: 'Checkout | Bordz',
}

const CheckoutLayout: React.FC<Readonly<React.PropsWithChildren>> = async ({
    children,
}) => {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <main className="pt-14">{children}</main>
                </Providers>
            </body>
        </html>
    )
}

export default CheckoutLayout
