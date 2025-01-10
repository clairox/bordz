'use client'

import { useQuery } from '@tanstack/react-query'

import { fetchAddress } from '@/lib/api'
import addressResponseToAddress from '@/utils/helpers/addressResponseToAddress'

const useAddress = (addressId: string | undefined, enabled: boolean = true) => {
    return useQuery<Address>({
        queryKey: ['address', addressId],
        queryFn: async () => {
            if (!addressId) {
                throw new Error('Invalid id')
            }

            const data = await fetchAddress(addressId)
            return addressResponseToAddress(data)
        },
        enabled,
    })
}

export default useAddress
