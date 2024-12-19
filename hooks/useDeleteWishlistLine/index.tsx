'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import fetchAbsolute from '@/lib/fetchAbsolute'

type UseDeleteWishlistLineArgs = { lineId: string }

const deleteWishlistLine = async (lineId: string) => {
    const response = await fetchAbsolute(`/wishlist/lines/${lineId}`, {
        method: 'DELETE',
    })
    if (!response.ok) {
        throw response
    }
    return await response.json()
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
