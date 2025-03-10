'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useSupabase } from '@/context/SupabaseContext'
import { useGetSessionUserRole } from '@/hooks/auth'
import { updateCustomer } from '@/lib/api'

export const useUpdatePersonalDetails = () => {
    const supabase = useSupabase()
    const queryClient = useQueryClient()
    const getSessionUserRole = useGetSessionUserRole()

    type MutationArgs = {
        email?: string
        firstName?: string
        lastName?: string
        phone?: string
    }
    return useMutation<void, Error, MutationArgs>({
        mutationFn: async ({ email, firstName, lastName, phone }) => {
            let userId = ''
            if (email) {
                const {
                    data: { user },
                    error,
                } = await supabase.auth.updateUser({ email }) // BUG: Getting weird error here
                if (error) {
                    throw error
                }
                userId = user!.id
            }

            await updateCustomer(userId, { email, firstName, lastName, phone })
        },
        onSuccess: async () => {
            if ((await getSessionUserRole()) === 'customer') {
                await queryClient.invalidateQueries({ queryKey: ['customer'] })
            }
        },
    })
}
