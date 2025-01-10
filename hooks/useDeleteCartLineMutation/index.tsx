import { useMutation, useQueryClient } from '@tanstack/react-query'

import cartResponseToCart from '@/utils/helpers/cartResponseToCart'
import { deleteCartLine } from '@/lib/api'

const useDeleteCartLineMutation = () => {
    const queryClient = useQueryClient()

    type MutationArgs = { lineId: string }
    return useMutation<Cart, Error, MutationArgs>({
        mutationFn: async ({ lineId }): Promise<Cart> => {
            const data = await deleteCartLine(lineId)
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
