import type { Metadata } from 'next'
import '@/styles/globals.css'
import AdminSidebar from '@/components/AdminSidebar'
import Providers from '@/context/providers'

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
                <Providers>
                    <div className="grid grid-cols-12">
                        <aside className="col-span-2">
                            <AdminSidebar />
                        </aside>
                        <main className="col-span-10 w-full">{children}</main>
                    </div>
                </Providers>
            </body>
        </html>
    )
}

export default RootLayout
