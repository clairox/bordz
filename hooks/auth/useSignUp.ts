'use client'

import { useCallback } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { User } from '@supabase/supabase-js'

import { useSupabase } from '@/context/SupabaseContext'
import { CustomerCreateArgs } from '@/types/api'
import { mapCustomerResponseToCustomer } from '@/utils/conversions'
import { createCustomer } from '@/lib/api'

export const useSignUp = () => {
    const supabase = useSupabase()
    const queryClient = useQueryClient()

    const signUp = useCallback(
        async (email: string, password: string): Promise<User> => {
            const {
                data: { user },
                error,
            } = await supabase.auth.signUp({
                email,
                password,
            })

            if (error) {
                throw error
            }

            if (!user) {
                throw new Error('An unexpected error has occurred.')
            }

            return user
        },
        [supabase]
    )

    type MutationArgs = Omit<CustomerCreateArgs, 'userId'> & {
        password: string
    }
    return useMutation<Customer, Error, MutationArgs>({
        mutationFn: async ({ email, password, ...args }) => {
            const user = await signUp(email, password)
            const data = await createCustomer({
                ...args,
                userId: user.id,
                email,
            })
            const customer = mapCustomerResponseToCustomer(data)

            await supabase
                .from('profiles')
                .update({ is_new: false })
                .eq('id', user.id)
            return customer
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ['auth'] })
        },
    })
}
