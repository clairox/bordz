'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useSupabase } from '@/context/SupabaseContext'

type Auth = {
    id: string
    email: string
} | null

type UseLoginVariables = {
    email: string
    password: string
}

const useLogin = () => {
    const supabase = useSupabase()
    const queryClient = useQueryClient()

    return useMutation<Auth, Error, UseLoginVariables>({
        mutationFn: async ({ email, password }) => {
            const {
                data: { user },
                error,
            } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) {
                throw error
            }

            return { id: user!.id, email: user!.email! }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['auth'] })
        },
    })
}

export default useLogin
