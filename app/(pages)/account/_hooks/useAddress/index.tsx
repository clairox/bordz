'use client'

import fetchAbsolute from '@/lib/fetchAbsolute'
import { AddressResponse } from '@/types/api'
import addressResponseToAddress from '@/utils/helpers/addressResponseToAddress'
import { useQuery } from '@tanstack/react-query'

const useAddress = (id: string | undefined, enabled: boolean = true) => {
    return useQuery<Address>({
        queryKey: ['address', id],
        queryFn: async () => {
            if (!id) {
                throw new Error('Invalid id')
            }

            const data = await fetchAbsolute<AddressResponse>(
                `/addresses/${id}`
            )
            return addressResponseToAddress(data)
        },
        enabled,
    })
}

export default useAddress
