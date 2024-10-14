import fetchAbsolute from '@/lib/fetchAbsolute'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

const useDeleteCartLineMutation = () => {
    const queryClient = useQueryClient()

    type DeleteCartLineVariables = { lineId: string }

    const deleteCartLine = useCallback(
        async ({ lineId }: DeleteCartLineVariables): Promise<Cart> => {
            try {
                const res = await fetchAbsolute(`/cart/lines/${lineId}`, {
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
        mutationFn: deleteCartLine,
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

export default useDeleteCartLineMutation
