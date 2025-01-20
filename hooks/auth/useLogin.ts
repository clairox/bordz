'use client'

import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Session } from '@supabase/supabase-js'

import { useSupabase } from '@/context/SupabaseContext'
import { useGetSessionUserRole } from '.'
import { fetchSessionData } from '@/utils/session'
import fetchAbsolute from '@/lib/fetchAbsolute'

export const useLogin = (redirectTo?: string) => {
    const supabase = useSupabase()
    const router = useRouter()
    const queryClient = useQueryClient()
    const getSessionUserRole = useGetSessionUserRole()

    type MutationArgs = { email: string; password: string }
    return useMutation<Session, Error, MutationArgs>({
        mutationFn: async ({ email, password }) => {
            const {
                data: { session },
                error,
            } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) {
                throw error
            }

            await fetchAbsolute<AuthInfo>('/session', {
                method: 'POST',
                body: JSON.stringify({
                    token: session!.access_token,
                }),
            })
            return session!
        },
        onSuccess: async ({ access_token }) => {
            const userRole = await getSessionUserRole()

            if (userRole === 'admin') {
                router.push('/admin')
            } else if (userRole === 'customer') {
                const session = await fetchSessionData(access_token)
                if (session) {
                    queryClient.setQueryData(['customer'], session.customer)
                    queryClient.setQueryData(['cart'], session.cart)
                    queryClient.setQueryData(['wishlist'], session.wishlist)
                }

                router.push(redirectTo ?? '/')
            }
        },
    })
}
