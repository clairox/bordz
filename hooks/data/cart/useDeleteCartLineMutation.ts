import { useMutation, useQueryClient } from '@tanstack/react-query'

import { mapCartResponseToCart } from '@/utils/conversions'
import { deleteCartLine } from '@/lib/api'

export const useDeleteCartLineMutation = () => {
    const queryClient = useQueryClient()

    type MutationArgs = { lineId: string }
    return useMutation<Cart, Error, MutationArgs>({
        mutationFn: async ({ lineId }): Promise<Cart> => {
            const data = await deleteCartLine(lineId)
            return mapCartResponseToCart(data)
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
