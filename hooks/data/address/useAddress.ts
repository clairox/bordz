'use client'

import { useQuery } from '@tanstack/react-query'

import { fetchAddress } from '@/lib/api'
import { mapAddressResponseToAddress } from '@/utils/conversions'

export const useAddress = (
    addressId: string | undefined,
    enabled: boolean = true
) => {
    return useQuery<Address>({
        queryKey: ['address', addressId],
        queryFn: async () => {
            if (!addressId) {
                throw new Error('Invalid id')
            }

            const data = await fetchAddress(addressId)
            return mapAddressResponseToAddress(data)
        },
        enabled,
    })
}
