import fetchAbsolute from '@/lib/fetchAbsolute'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

const useClearCartMutation = () => {
    const queryClient = useQueryClient()

    const clearCart = useCallback(async (): Promise<Cart> => {
        try {
            const res = await fetchAbsolute(`/cart/lines`, {
                method: 'DELETE',
            })

            return await res.json()
        } catch (error) {
            throw error
        }
    }, [])

    return useMutation({
        mutationFn: clearCart,
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
