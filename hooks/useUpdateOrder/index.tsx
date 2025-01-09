'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import updateOrder from '@/lib/api/updateOrder'
import { OrderUpdateArgs } from '@/types/api'

const useUpdateOrder = (orderId: string) => {
    const queryClient = useQueryClient()
    return useMutation<Order, Error, OrderUpdateArgs>({
        mutationFn: args => updateOrder(orderId, args),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['orders', orderId] }),
    })
}

export default useUpdateOrder
