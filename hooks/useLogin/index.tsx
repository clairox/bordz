'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useSupabase } from '@/context/SupabaseContext'
import useGetSessionUserRole from '../useGetSessionUserRole'
import { useRouter } from 'next/navigation'

type Auth = {
    id: string
    email: string
} | null

type UseLoginVariables = {
    email: string
    password: string
}

const useLogin = (redirectTo?: string) => {
    const supabase = useSupabase()
    const router = useRouter()
    const queryClient = useQueryClient()
    const getSessionUserRole = useGetSessionUserRole()

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
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ['auth'] })

            const userRole = await getSessionUserRole()
            if (userRole === 'admin') {
                router.push('/admin')
            } else if (userRole === 'customer') {
                router.push(redirectTo ?? '/')
            }
        },
    })
}

export default useLogin
