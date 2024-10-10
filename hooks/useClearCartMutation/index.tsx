import fetchAbsolute from '@/lib/fetchAbsolute'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

const useClearCartMutation = () => {
    const queryClient = useQueryClient()

    type ClearCartVariables = { cartId: string }

    const clearCart = useCallback(
        async ({ cartId }: ClearCartVariables): Promise<Cart> => {
            try {
                const res = await fetchAbsolute(`/carts/${cartId}/lines`, {
                    method: 'DELETE',
                })

                return await res.json()
            } catch (error) {
                throw error
            }
        },
        []
    )

    return useMutation({
        mutationFn: clearCart,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
    })
}

export default useClearCartMutation
