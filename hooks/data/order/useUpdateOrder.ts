'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateOrder } from '@/lib/api'
import { OrderUpdateArgs } from '@/types/api'
import { mapOrderResponseToOrder } from '@/utils/conversions'

export const useUpdateOrder = () => {
    const queryClient = useQueryClient()
    type MutationArgs = { id: string } & OrderUpdateArgs
    return useMutation<Order, Error, MutationArgs>({
        mutationFn: async ({ id, ...args }) => {
            const data = await updateOrder(id, args)
            return mapOrderResponseToOrder(data)
        },
        onSuccess: ({ id }) =>
            queryClient.invalidateQueries({ queryKey: ['orders', id] }),
    })
}
