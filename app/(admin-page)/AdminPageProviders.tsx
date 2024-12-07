'use client'

import { QueryClientProvider } from '@tanstack/react-query'

import { AuthProvider } from '@/context/AuthContext'
import { SupabaseProvider } from '@/context/SupabaseContext'
import { getQueryClient } from '@/lib/queryClient'

const AdminPageProviders: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const queryClient = getQueryClient()

    return (
        <SupabaseProvider>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>{children}</AuthProvider>
            </QueryClientProvider>
        </SupabaseProvider>
    )
}

export default AdminPageProviders
