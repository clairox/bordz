'use client'

import { useCallback } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Session } from '@supabase/supabase-js'

import { useSupabase } from '@/context/SupabaseContext'
import { CustomerCreateArgs } from '@/types/api'
import { createCustomer } from '@/lib/api'
import { fetchSessionData } from '@/utils/session'

export const useSignUp = () => {
    const supabase = useSupabase()
    const queryClient = useQueryClient()

    const signUp = useCallback(
        async (email: string, password: string): Promise<Session> => {
            const {
                data: { session },
                error,
            } = await supabase.auth.signUp({
                email,
                password,
            })

            if (error) {
                throw error
            }

            if (!session) {
                throw new Error('An unexpected error has occurred.')
            }

            return session
        },
        [supabase]
    )

    type MutationArgs = Omit<CustomerCreateArgs, 'userId'> & {
        password: string
    }
    return useMutation<Session, Error, MutationArgs>({
        mutationFn: async ({ email, password, ...args }) => {
            const session = await signUp(email, password)
            await createCustomer({
                ...args,
                userId: session.user.id,
                email,
            })

            await supabase
                .from('profiles')
                .update({ is_new: false })
                .eq('id', session.user.id)

            return session
        },
        onSuccess: async ({ access_token }) => {
            const session = await fetchSessionData(access_token)
            if (session) {
                queryClient.setQueryData(['customer'], session.customer)
                queryClient.setQueryData(['cart'], session.cart)
                queryClient.setQueryData(['wishlist'], session.wishlist)
            }
        },
    })
}
