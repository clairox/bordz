'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './authContext'
import { getQueryClient } from '../lib/queryClient'
import { CartProvider } from './cartContext'

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
    const queryClient = getQueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <CartProvider>{children}</CartProvider>
            </AuthProvider>
        </QueryClientProvider>
    )
}

export default Providers
