'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import fetchAbsolute from '@/lib/fetchAbsolute'

type UseAddWishlistLineArgs = { productId: string }

const addWishlistLine = async (productId: string) => {
    const response = await fetchAbsolute(`/wishlist/lines`, {
        method: 'POST',
        body: JSON.stringify({ productId }),
    })
    if (!response.ok) {
        throw response
    }
    return await response.json()
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
