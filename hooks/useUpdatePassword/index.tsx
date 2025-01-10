'use client'

import { useSupabase } from '@/context/SupabaseContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useGetSessionUserRole } from '@/hooks'

type UseUpdatePasswordArgs = {
    password: string
}

const useUpdatePassword = () => {
    const supabase = useSupabase()
    const queryClient = useQueryClient()
    const getSessionUserRole = useGetSessionUserRole()
    return useMutation<void, Error, UseUpdatePasswordArgs>({
        mutationFn: async args => {
            // TODO: call supabase.auth.reauthenticate and set nonce with return value
            const { error } = await supabase.auth.updateUser({
                password: args.password,
            })
            if (error) {
                throw error
            }
            return
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ['auth'] })
            if ((await getSessionUserRole()) === 'customer') {
                queryClient.invalidateQueries({ queryKey: ['customer'] })
            }
        },
    })
}

export default useUpdatePassword
