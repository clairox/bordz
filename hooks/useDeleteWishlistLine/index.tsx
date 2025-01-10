'use client'

import { deleteWishlistLine } from '@/lib/api'
import wishlistResponseToWishlist from '@/utils/helpers/wishlistResponseToWishlist'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useDeleteWishlistLine = () => {
    const queryClient = useQueryClient()

    type MutationArgs = { lineId: string }
    return useMutation<Wishlist, Error, MutationArgs>({
        mutationFn: async ({ lineId }) => {
            const data = await deleteWishlistLine(lineId)
            return wishlistResponseToWishlist(data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlist'] })
        },
    })
}

export default useDeleteWishlistLine
