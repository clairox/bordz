'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { AddressUpdateArgs } from '@/types/api'
import { updateAddress } from '@/lib/api'
import { mapAddressResponseToAddress } from '@/utils/conversions'

export const useUpdateAddress = (addressId: string | null | undefined) => {
    const queryClient = useQueryClient()
    return useMutation<Address, Error, AddressUpdateArgs>({
        mutationFn: async args => {
            if (!addressId) {
                throw new Error('Missing addressId')
            }
            const data = await updateAddress(addressId, args)
            return mapAddressResponseToAddress(data)
        },
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['customer'] }),
    })
}
