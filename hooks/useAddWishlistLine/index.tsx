'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import fetchAbsolute from '@/lib/fetchAbsolute'
import { WishlistResponse } from '@/types/api'
import wishlistResponseToWishlist from '@/utils/helpers/wishlistResponseToWishlist'

type UseAddWishlistLineArgs = { productId: string }

const addWishlistLine = async (productId: string): Promise<Wishlist> => {
    const data = await fetchAbsolute<WishlistResponse>(`/wishlist/lines`, {
        method: 'POST',
        body: JSON.stringify({ productId }),
    })
    return wishlistResponseToWishlist(data)
}

const useAddWishlistLine = () => {
    const queryClient = useQueryClient()

    return useMutation<Wishlist, Error, UseAddWishlistLineArgs>({
        mutationFn: async args => addWishlistLine(args.productId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlist'] })
        },
    })
}

export default useAddWishlistLine
