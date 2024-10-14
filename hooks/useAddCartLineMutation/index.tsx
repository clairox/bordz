import fetchAbsolute from '@/lib/fetchAbsolute'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

const useAddCartLineMutation = () => {
    const queryClient = useQueryClient()

    type AddCartLineVariables = { productId: string }

    const addCartLine = useCallback(
        async ({ productId }: AddCartLineVariables): Promise<Cart> => {
            try {
                const res = await fetchAbsolute(`/cart/lines`, {
                    method: 'POST',
                    body: JSON.stringify({ productId, quantity: 1 }),
                })

                return await res.json()
            } catch (error) {
                throw error
            }
        },
        []
    )

    return useMutation({
        mutationFn: addCartLine,
        onSuccess: cart => {
            queryClient.invalidateQueries({ queryKey: ['cart'] })

            if (cart.checkout) {
                queryClient.invalidateQueries({
                    queryKey: ['checkout', cart.checkout.id],
                })
            }
        },
    })
}

export default useAddCartLineMutation
