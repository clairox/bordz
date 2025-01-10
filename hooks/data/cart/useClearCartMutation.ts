import { useMutation, useQueryClient } from '@tanstack/react-query'

import { mapCartResponseToCart } from '@/utils/conversions'
import { clearCart } from '@/lib/api'

export const useClearCartMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (): Promise<Cart> => {
            const data = await clearCart()
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
