'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { AddressCreateArgs } from '@/types/api'
import { createAddress } from '@/lib/api'
import { mapAddressResponseToAddress } from '@/utils/conversions'

export const useCreateAddress = () => {
    const queryClient = useQueryClient()
    return useMutation<Address, Error, AddressCreateArgs>({
        mutationFn: async args => {
            const data = await createAddress(args)
            return mapAddressResponseToAddress(data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customer'] })
        },
    })
}
