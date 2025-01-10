'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import cartResponseToCart from '@/utils/helpers/cartResponseToCart'
import { createCartLine } from '@/lib/api'

const useAddCartLineMutation = () => {
    const queryClient = useQueryClient()

    type MutationArgs = { productId: string }
    return useMutation<Cart, Error, MutationArgs>({
        mutationFn: async ({ productId }): Promise<Cart> => {
            const data = await createCartLine(productId)
            return cartResponseToCart(data)
        },
        onSuccess: cart => {
            queryClient.invalidateQueries({ queryKey: ['cart'] })

            if (cart.checkoutId) {
                queryClient.invalidateQueries({
                    queryKey: ['checkout', cart.checkoutId],
                })
            }
        },
    })
}

export default useAddCartLineMutation
