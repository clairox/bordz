import { useCallback } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useSupabase } from '@/context/SupabaseContext'
import fetchAbsolute from '@/lib/fetchAbsolute'
import useGetSessionUserRole from '../useGetSessionUserRole'

const useSignOut = () => {
    const supabase = useSupabase()
    const queryClient = useQueryClient()
    const getSessionUserRole = useGetSessionUserRole()

    const killSession = useCallback(async () => {
        try {
            const res = await fetchAbsolute(`/session`, {
                method: 'DELETE',
            })

            if (!res.ok) {
                throw res
            }

            return null
        } catch (error) {
            throw error
        }
    }, [])

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
            }
        },
    })
}

export default useSignOut
