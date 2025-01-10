'use client'

import { deleteWishlistLine } from '@/lib/api'
import { mapWishlistResponseToWishlist } from '@/utils/conversions'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteWishlistLine = () => {
    const queryClient = useQueryClient()

    type MutationArgs = { lineId: string }
    return useMutation<Wishlist, Error, MutationArgs>({
        mutationFn: async ({ lineId }) => {
            const data = await deleteWishlistLine(lineId)
            return mapWishlistResponseToWishlist(data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlist'] })
        },
    })
}
