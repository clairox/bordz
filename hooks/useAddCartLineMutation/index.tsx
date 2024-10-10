import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

const useAddCartLineMutation = () => {
    const queryClient = useQueryClient()

    type AddCartLineVariables = { cartId: string; productId: string }

    const addCartLine = useCallback(
        async ({ cartId, productId }: AddCartLineVariables): Promise<Cart> => {
            try {
                const res = await fetch(`/api/carts/${cartId}/lines`, {
                    method: 'POST',
                    body: JSON.stringify({ productId }),
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
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
    })
}

export default useAddCartLineMutation
