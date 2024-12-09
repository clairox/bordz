'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import fetchAbsolute from '@/lib/fetchAbsolute'

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
            const response = await fetchAbsolute(`/addresses/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(rest),
            })
            if (!response.ok) {
                throw response
            }
            return await response.json()
        },
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['customer'] }),
    })
}

export default useUpdateAddress
