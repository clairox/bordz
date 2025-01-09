import { useMutation, useQueryClient } from '@tanstack/react-query'

import fetchAbsolute from '@/lib/fetchAbsolute'

const useDeleteCartLineMutation = () => {
    const queryClient = useQueryClient()

    type DeleteCartLineVariables = { lineId: string }

    return useMutation({
        mutationFn: async ({
            lineId,
        }: DeleteCartLineVariables): Promise<Cart> => {
            try {
                const res = await fetchAbsolute(`/cart/lines/${lineId}`, {
                    method: 'DELETE',
                })

                return await res.json()
            } catch (error) {
                throw error
            }
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

export default useDeleteCartLineMutation
