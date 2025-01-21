'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { mapCartResponseToCart } from '@/utils/conversions'
import { createCartLine } from '@/lib/api'

export const useAddCartLine = () => {
    const queryClient = useQueryClient()

    type MutationArgs = { productId: string }
    return useMutation<Cart, Error, MutationArgs>({
        mutationFn: async ({ productId }): Promise<Cart> => {
            const data = await createCartLine(productId)
            return mapCartResponseToCart(data)
        },
        onSuccess: async cart => {
            await queryClient.invalidateQueries({ queryKey: ['cart'] })

            if (cart.checkoutId) {
                await queryClient.invalidateQueries({
                    queryKey: ['checkout', cart.checkoutId],
                })
            }
        },
    })
}
