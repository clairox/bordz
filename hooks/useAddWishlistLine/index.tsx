'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createWishlistLine } from '@/lib/api'
import wishlistResponseToWishlist from '@/utils/helpers/wishlistResponseToWishlist'

const useAddWishlistLine = () => {
    const queryClient = useQueryClient()

    type MutationArgs = { productId: string }
    return useMutation<Wishlist, Error, MutationArgs>({
        mutationFn: async ({ productId }) => {
            const data = await createWishlistLine(productId)
            return wishlistResponseToWishlist(data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlist'] })
        },
    })
}

export default useAddWishlistLine
