'use client'

import { QueryClientProvider } from '@tanstack/react-query'

import { getQueryClient } from '../lib/queryClient'
import { CartProvider } from './CartContext'
import { SupabaseProvider } from './SupabaseContext'
import { CustomerProvider } from './CustomerContext'
import { WishlistProvider } from './WishlistContext'

type ProvidersProps = React.PropsWithChildren

const Providers: React.FC<ProvidersProps> = ({ children }) => {
    const queryClient = getQueryClient()

    return (
        <SupabaseProvider>
            <QueryClientProvider client={queryClient}>
                <CustomerProvider>
                    <CartProvider>
                        <WishlistProvider>{children}</WishlistProvider>
                    </CartProvider>
                </CustomerProvider>
            </QueryClientProvider>
        </SupabaseProvider>
    )
}

export default Providers
