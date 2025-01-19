'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createWishlistLine } from '@/lib/api'
import { mapWishlistResponseToWishlist } from '@/utils/conversions'

export const useAddWishlistLine = () => {
    const queryClient = useQueryClient()

    type MutationArgs = { productId: string }
    return useMutation<Wishlist, Error, MutationArgs>({
        mutationFn: async ({ productId }) => {
            const data = await createWishlistLine(productId)
            return mapWishlistResponseToWishlist(data)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['wishlist'] })
            await queryClient.invalidateQueries({ queryKey: ['wishlistLines'] })
        },
    })
}
