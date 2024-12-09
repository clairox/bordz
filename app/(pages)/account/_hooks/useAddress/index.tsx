'use client'

import fetchAbsolute from '@/lib/fetchAbsolute'
import { useQuery } from '@tanstack/react-query'

const useAddress = (id: string | undefined, enabled: boolean = true) => {
    return useQuery<Address>({
        queryKey: ['address', id],
        queryFn: async () => {
            if (!id) {
                throw new Error('Invalid id')
            }

            const response = await fetchAbsolute(`/addresses/${id}`)
            if (!response.ok) {
                throw response
            }
            return await response.json()
        },
        enabled,
    })
}

export default useAddress
