import { useMutation, useQueryClient } from '@tanstack/react-query'

import { mapCartResponseToCart } from '@/utils/conversions'
import { deleteCartLine } from '@/lib/api'

export const useDeleteCartLine = () => {
    const queryClient = useQueryClient()

    type MutationArgs = { lineId: string }
    return useMutation<Cart, Error, MutationArgs>({
        mutationFn: async ({ lineId }): Promise<Cart> => {
            const data = await deleteCartLine(lineId)
            return mapCartResponseToCart(data)
        },
        onSuccess: async cart => {
            await queryClient.invalidateQueries({ queryKey: ['cart'] })

            if (cart.checkoutId) {
                await queryClient.invalidateQueries({
                    queryKey: ['checkout', cart.checkoutId],
                })
            }
        },
    })
}
