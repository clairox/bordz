'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import fetchAbsolute from '@/lib/fetchAbsolute'
import { AddressResponse } from '@/types/api'
import addressResponseToAddress from '@/utils/helpers/addressResponseToAddress'

type UseCreateAddressArgs = {
    fullName: string
    line1: string
    line2?: string
    city: string
    state: string
    countryCode: string
    postalCode: string
    phone?: string
    ownerId?: string
    isCustomerDefault?: boolean
}

const useCreateAddress = () => {
    const queryClient = useQueryClient()
    return useMutation<Address, Error, UseCreateAddressArgs>({
        mutationFn: async args => {
            const data = await fetchAbsolute<AddressResponse>('/addresses', {
                method: 'POST',
                body: JSON.stringify(args),
            })
            return addressResponseToAddress(data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customer'] })
        },
    })
}

export default useCreateAddress
