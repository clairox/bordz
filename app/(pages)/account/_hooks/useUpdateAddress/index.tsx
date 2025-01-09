'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import fetchAbsolute from '@/lib/fetchAbsolute'
import { AddressResponse } from '@/types/api'
import addressResponseToAddress from '@/utils/helpers/addressResponseToAddress'

type UseUpdateAddressArgs = {
    id: string
    fullName?: string
    line1?: string
    line2?: string | null
    city?: string
    state?: string
    countryCode?: string
    postalCode?: string
    phone?: string | null
    isCustomerDefault?: boolean
}

const useUpdateAddress = () => {
    const queryClient = useQueryClient()
    return useMutation<Address, Error, UseUpdateAddressArgs>({
        mutationFn: async args => {
            const { id, ...rest } = args
            const data = await fetchAbsolute<AddressResponse>(
                `/addresses/${id}`,
                {
                    method: 'PATCH',
                    body: JSON.stringify(rest),
                }
            )
            return addressResponseToAddress(data)
        },
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['customer'] }),
    })
}

export default useUpdateAddress
