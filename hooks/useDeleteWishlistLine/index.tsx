'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import fetchAbsolute from '@/lib/fetchAbsolute'
import wishlistResponseToWishlist from '@/utils/helpers/wishlistResponseToWishlist'
import { WishlistResponse } from '@/types/api'

type UseDeleteWishlistLineArgs = { lineId: string }

const deleteWishlistLine = async (lineId: string): Promise<Wishlist> => {
    const data = await fetchAbsolute<WishlistResponse>(
        `/wishlist/lines/${lineId}`,
        {
            method: 'DELETE',
        }
    )
    return wishlistResponseToWishlist(data)
}

const useDeleteWishlistLine = () => {
    const queryClient = useQueryClient()

    return useMutation<Wishlist, Error, UseDeleteWishlistLineArgs>({
        mutationFn: async args => deleteWishlistLine(args.lineId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlist'] })
        },
    })
}

export default useDeleteWishlistLine
