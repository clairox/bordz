'use client'

import { useSupabase } from '@/context/SupabaseContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useGetSessionUserRole } from '@/hooks/auth'

export const useUpdatePassword = () => {
    const supabase = useSupabase()
    const queryClient = useQueryClient()
    const getSessionUserRole = useGetSessionUserRole()

    type MutationArgs = { password: string }
    return useMutation<void, Error, MutationArgs>({
        mutationFn: async args => {
            // TODO: call supabase.auth.reauthenticate and set nonce with return value
            const { error } = await supabase.auth.updateUser({
                password: args.password,
            })
            if (error) {
                throw error
            }
        },
        onSuccess: async () => {
            if ((await getSessionUserRole()) === 'customer') {
                await queryClient.invalidateQueries({ queryKey: ['customer'] })
            }
        },
    })
}
