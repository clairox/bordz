'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './authContext'
import { getQueryClient } from '../lib/queryClient'

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
    const queryClient = getQueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
    )
}

export default Providers
