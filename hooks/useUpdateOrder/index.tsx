'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateOrder } from '@/lib/api'
import { OrderUpdateArgs } from '@/types/api'
import orderResponseToOrder from '@/utils/helpers/orderResponseToOrder'

const useUpdateOrder = (orderId: string) => {
    const queryClient = useQueryClient()
    return useMutation<Order, Error, OrderUpdateArgs>({
        mutationFn: async args => {
            const data = await updateOrder(orderId, args)
            return orderResponseToOrder(data)
        },
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['orders', orderId] }),
    })
}

export default useUpdateOrder
