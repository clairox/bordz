'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { AddressCreateArgs } from '@/types/api'
import addressResponseToAddress from '@/utils/helpers/addressResponseToAddress'
import { createAddress } from '@/lib/api'

const useCreateAddress = () => {
    const queryClient = useQueryClient()
    return useMutation<Address, Error, AddressCreateArgs>({
        mutationFn: async args => {
            const data = await createAddress(args)
            return addressResponseToAddress(data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customer'] })
        },
    })
}

export default useCreateAddress
