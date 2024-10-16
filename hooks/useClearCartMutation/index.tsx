import { useMutation, useQueryClient } from '@tanstack/react-query'

import fetchAbsolute from '@/lib/fetchAbsolute'

const useClearCartMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (): Promise<Cart> => {
            try {
                const res = await fetchAbsolute(`/cart/lines`, {
                    method: 'DELETE',
                })

                return await res.json()
            } catch (error) {
                throw error
            }
        },
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

export default useClearCartMutation
