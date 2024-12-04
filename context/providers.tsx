'use client'

import { QueryClientProvider } from '@tanstack/react-query'

import { AuthProvider } from './AuthContext'
import { getQueryClient } from '../lib/queryClient'
import { CartProvider } from './CartContext'
import { SupabaseProvider } from './SupabaseContext'

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
    const queryClient = getQueryClient()

    return (
        <SupabaseProvider>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <CartProvider>{children}</CartProvider>
                </AuthProvider>
            </QueryClientProvider>
        </SupabaseProvider>
    )
}

export default Providers
