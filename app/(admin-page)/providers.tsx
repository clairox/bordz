'use client'

import { QueryClientProvider } from '@tanstack/react-query'

import { SupabaseProvider } from '@/context/SupabaseContext'
import { getQueryClient } from '@/lib/queryClient'

const AdminPageProviders: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const queryClient = getQueryClient()

    return (
        <SupabaseProvider>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </SupabaseProvider>
    )
}

export default AdminPageProviders
