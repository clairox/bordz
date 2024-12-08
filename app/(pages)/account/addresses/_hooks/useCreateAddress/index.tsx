'use client'

import { useMutation } from '@tanstack/react-query'

import fetchAbsolute from '@/lib/fetchAbsolute'

type UseCreateAddressArgs = {
    fullName: string
    line1: string
    line2?: string | null
    city: string
    state: string
    countryCode: string
    postalCode: string
    phone?: string | null
}

const useCreateAddress = () => {
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
    })
}

export default useCreateAddress
