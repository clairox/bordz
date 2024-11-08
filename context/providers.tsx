'use client'

import { QueryClientProvider } from '@tanstack/react-query'

import { AuthProvider } from './authContext'
import { getQueryClient } from '../lib/queryClient'
import { CartProvider } from './cartContext'
import { SupabaseProvider } from './supabaseContext'

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
