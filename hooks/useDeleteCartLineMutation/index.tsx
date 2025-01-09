import { useMutation, useQueryClient } from '@tanstack/react-query'

import fetchAbsolute from '@/lib/fetchAbsolute'
import { CartResponse } from '@/types/api'
import cartResponseToCart from '@/utils/helpers/cartResponseToCart'

const useDeleteCartLineMutation = () => {
    const queryClient = useQueryClient()

    type DeleteCartLineVariables = { lineId: string }

    return useMutation({
        mutationFn: async ({
            lineId,
        }: DeleteCartLineVariables): Promise<Cart> => {
            const data = await fetchAbsolute<CartResponse>(
                `/cart/lines/${lineId}`,
                {
                    method: 'DELETE',
                }
            )
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

export default useDeleteCartLineMutation
