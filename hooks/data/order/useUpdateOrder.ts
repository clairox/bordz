'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateOrder } from '@/lib/api'
import { OrderUpdateArgs } from '@/types/api'

export const useUpdateOrder = (orderId: string) => {
    const queryClient = useQueryClient()
    return useMutation<void, Error, OrderUpdateArgs>({
        mutationFn: async args => {
            await updateOrder(orderId, args)
        },
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['orders', orderId] }),
    })
}
