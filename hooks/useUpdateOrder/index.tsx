'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import updateOrder from '@/lib/api/updateOrder'

const useUpdateOrder = (orderId: string) => {
    const queryClient = useQueryClient()
    return useMutation<Order, Error, UpdateOrderArgs>({
        mutationFn: args => updateOrder(orderId, args),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['orders', orderId] }),
    })
}

export default useUpdateOrder
