'use client'

import fetchAbsolute from '@/lib/fetchAbsolute'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type UseDeleteAddressArgs = { id: string }

const useDeleteAddress = () => {
    const queryClient = useQueryClient()

    return useMutation<void, Error, UseDeleteAddressArgs>({
        mutationFn: async ({ id }) => {
            const response = await fetchAbsolute(`/addresses/${id}`, {
                method: 'DELETE',
            })
            if (!response.ok) {
                throw response
            }
            return
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customer'] })
        },
    })
}

export default useDeleteAddress
