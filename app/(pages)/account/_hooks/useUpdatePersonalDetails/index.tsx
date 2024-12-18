'use client'

import { useSupabase } from '@/context/SupabaseContext'
import fetchAbsolute from '@/lib/fetchAbsolute'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type UseUpdatePersonalDetailsArgs = {
    email?: string
    firstName?: string
    lastName?: string
    phone?: string
}

const useUpdatePersonalDetails = () => {
    const supabase = useSupabase()
    const queryClient = useQueryClient()
    return useMutation<void, Error, UseUpdatePersonalDetailsArgs>({
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

            const response = await fetchAbsolute(`/customers`, {
                method: 'PATCH',
                body: JSON.stringify({ userId, firstName, lastName, phone }),
            })
            if (!response.ok) {
                throw response
            }
            return
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customer'] })
            queryClient.invalidateQueries({ queryKey: ['auth'] })
        },
    })
}

export default useUpdatePersonalDetails
