'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import fetchAbsolute from '@/lib/fetchAbsolute'

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
            const response = await fetchAbsolute('/addresses', {
                method: 'POST',
                body: JSON.stringify(args),
            })
            if (!response.ok) {
                throw response
            }
            return await response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customer'] })
        },
    })
}

export default useCreateAddress
