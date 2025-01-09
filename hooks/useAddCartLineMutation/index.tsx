'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import fetchAbsolute from '@/lib/fetchAbsolute'
import { CartResponse } from '@/types/api'
import cartResponseToCart from '@/utils/helpers/cartResponseToCart'

const useAddCartLineMutation = () => {
    const queryClient = useQueryClient()

    type AddCartLineVariables = { productId: string }

    return useMutation({
        mutationFn: async ({
            productId,
        }: AddCartLineVariables): Promise<Cart> => {
            const data = await fetchAbsolute<CartResponse>(`/cart/lines`, {
                method: 'POST',
                body: JSON.stringify({ productId, quantity: 1 }),
            })
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
