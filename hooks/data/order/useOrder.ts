'use client'

import { useSuspenseQuery } from '@tanstack/react-query'

import { fetchOrder } from '@/lib/api'
import { mapOrderResponseToOrder } from '@/utils/conversions'

export const useOrder = (id: string) => {
    return useSuspenseQuery<Order>({
        queryKey: ['order', id],
        queryFn: async () => {
            const response = await fetchOrder(id)
            return mapOrderResponseToOrder(response)
        },
    })
}
