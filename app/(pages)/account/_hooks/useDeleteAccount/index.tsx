'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useAuth } from '@/context/AuthContext'
import { useSupabase } from '@/context/SupabaseContext'
import { useGetSessionUserRole } from '@/hooks'
import fetchAbsolute from '@/lib/fetchAbsolute'
import killSession from '@/utils/helpers/killSession'
import { useRouter } from 'next/navigation'

type UseDeleteAccountArgs = { password: string }

const deleteCustomer = async (userId: string) => {
    const response = await fetchAbsolute(`/customers?userId=${userId}`, {
        method: 'DELETE',
    })
    if (!response.ok) {
        throw response
    }
}

const useDeleteAccount = () => {
    const supabase = useSupabase()
    const queryClient = useQueryClient()
    const router = useRouter()
    const { data: auth } = useAuth()
    const getSessionUserRole = useGetSessionUserRole()

    const login = async (email: string, password: string) => {
        const {
            data: { user },
            error,
        } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
            throw error
        }

        return user!
    }

    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            throw error
        }
    }

    return useMutation<{ role: string } | void, Error, UseDeleteAccountArgs>({
        mutationFn: async ({ password }) => {
            if (!auth) {
                return
            }

            const user = await login(auth.email, password)

            const role = await getSessionUserRole()

            const { error } = await supabase
                .from('deletion_requests')
                .insert({ user_id: user.id })
            if (error) {
                throw error
            }

            await deleteCustomer(user.id)

            if (role) {
                return { role }
            }
        },
        onSuccess: async data => {
            await killSession()

            queryClient.setQueryData(['auth'], null)
            if (data?.role === 'customer') {
                queryClient.removeQueries({ queryKey: ['customer'] })
                queryClient.removeQueries({ queryKey: ['cart'] })
            }

            router.push('/')
        },
    })
}

export default useDeleteAccount