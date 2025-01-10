'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteAddress } from '@/lib/api'

const useDeleteAddress = () => {
    const queryClient = useQueryClient()

    type MutationArgs = { addressId: string }
    return useMutation<void, Error, MutationArgs>({
        mutationFn: async ({ addressId }) => {
            await deleteAddress(addressId)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customer'] })
        },
    })
}

export default useDeleteAddress
