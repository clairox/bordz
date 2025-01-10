'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteAddress } from '@/lib/api'

export const useDeleteAddress = () => {
    const queryClient = useQueryClient()

    type MutationArgs = { id: string }
    return useMutation<void, Error, MutationArgs>({
        mutationFn: async ({ id }) => {
            await deleteAddress(id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customer'] })
        },
    })
}
