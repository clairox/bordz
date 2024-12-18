'use client'

import { useCallback } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { User } from '@supabase/supabase-js'

import { useSupabase } from '@/context/SupabaseContext'
import fetchAbsolute from '@/lib/fetchAbsolute'

type CreateCustomerArgs = {
    userId: string
    email: string
    firstName: string
    lastName: string
    birthDate?: Date
    phone?: string
}

type UseSignUpMutationArgs = Omit<CreateCustomerArgs, 'userId'> & {
    password: string
}

const createCustomer = async (args: CreateCustomerArgs) => {
    const res = await fetchAbsolute('/customers', {
        method: 'POST',
        body: JSON.stringify(args),
    })
    if (!res.ok) {
        throw res
    }
    return await res.json()
}

const useSignUp = () => {
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

    return useMutation<Customer, Error, UseSignUpMutationArgs>({
        mutationFn: async args => {
            const { email, password, ...rest } = args
            const user = await signUp(email, password)
            const customer = await createCustomer({
                ...rest,
                userId: user.id,
                email,
            })
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

export default useSignUp
