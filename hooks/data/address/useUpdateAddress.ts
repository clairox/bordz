'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { AddressUpdateArgs } from '@/types/api'
import { updateAddress } from '@/lib/api'
import { mapAddressResponseToAddress } from '@/utils/conversions'

export const useUpdateAddress = () => {
    const queryClient = useQueryClient()

    type MutationArgs = { id: string } & AddressUpdateArgs
    return useMutation<Address, Error, MutationArgs>({
        mutationFn: async ({ id, ...args }) => {
            if (!id) {
                throw new Error('Missing addressId')
            }
            const data = await updateAddress(id, args)
            return mapAddressResponseToAddress(data)
        },
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['customer'] }),
    })
}
