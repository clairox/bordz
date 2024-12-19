'use client'

import { QueryClientProvider } from '@tanstack/react-query'

import { AuthProvider } from './AuthContext'
import { getQueryClient } from '../lib/queryClient'
import { CartProvider } from './CartContext'
import { SupabaseProvider } from './SupabaseContext'
import { CustomerProvider } from './CustomerContext'
import { WishlistProvider } from './WishlistContext'

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
    const queryClient = getQueryClient()

    return (
        <SupabaseProvider>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <CustomerProvider>
                        <CartProvider>
                            <WishlistProvider>{children}</WishlistProvider>
                        </CartProvider>
                    </CustomerProvider>
                </AuthProvider>
            </QueryClientProvider>
        </SupabaseProvider>
    )
}

export default Providers
