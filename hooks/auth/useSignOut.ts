import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useSupabase } from '@/context/SupabaseContext'
import { useGetSessionUserRole } from '.'
import { killSession } from '@/utils/session'

export const useSignOut = () => {
    const supabase = useSupabase()
    const queryClient = useQueryClient()
    const getSessionUserRole = useGetSessionUserRole()

    return useMutation({
        mutationFn: async () => {
            const userRole = await getSessionUserRole()

            const { error } = await supabase.auth.signOut()
            if (error) {
                throw error
            }

            if (userRole) {
                return { role: userRole }
            }
        },
        onSuccess: async data => {
            await killSession()

            queryClient.setQueryData(['auth'], null)
            if (data?.role === 'customer') {
                queryClient.removeQueries({ queryKey: ['customer'] })
                queryClient.removeQueries({ queryKey: ['cart'] })
                queryClient.removeQueries({ queryKey: ['wishlist'] })
            }
        },
    })
}
