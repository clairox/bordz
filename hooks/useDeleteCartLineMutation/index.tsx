import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

const useDeleteCartLineMutation = () => {
    const queryClient = useQueryClient()

    type DeleteCartLineVariables = { cartId: string; lineId: string }

    const deleteCartLine = useCallback(
        async ({ cartId, lineId }: DeleteCartLineVariables): Promise<Cart> => {
            try {
                const res = await fetch(
                    `/api/carts/${cartId}/lines/${lineId}`,
                    {
                        method: 'DELETE',
                    }
                )

                return await res.json()
            } catch (error) {
                throw error
            }
        },
        []
    )

    return useMutation({
        mutationFn: deleteCartLine,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
    })
}

export default useDeleteCartLineMutation
