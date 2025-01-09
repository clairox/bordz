'use client'

import { useCallback } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { User } from '@supabase/supabase-js'

import { useSupabase } from '@/context/SupabaseContext'
import fetchAbsolute from '@/lib/fetchAbsolute'
import { CustomerResponse } from '@/types/api'
import customerResponseToCustomer from '@/utils/helpers/customerResponseToCustomer'

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

const createCustomer = async (
    args: CreateCustomerArgs
): Promise<CustomerResponse> => {
    return await fetchAbsolute<CustomerResponse>('/customers', {
        method: 'POST',
        body: JSON.stringify(args),
    })
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
            const data = await createCustomer({
                ...rest,
                userId: user.id,
                email,
            })
            const customer = customerResponseToCustomer(data)

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
