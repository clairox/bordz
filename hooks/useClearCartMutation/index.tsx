import { useMutation, useQueryClient } from '@tanstack/react-query'

import cartResponseToCart from '@/utils/helpers/cartResponseToCart'
import { clearCart } from '@/lib/api'

const useClearCartMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (): Promise<Cart> => {
            const data = await clearCart()
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

export default useClearCartMutation
