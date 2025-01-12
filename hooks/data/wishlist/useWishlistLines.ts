import { useInfiniteQuery } from '@tanstack/react-query'

import { fetchWishlistLines } from '@/lib/api'
import { mapProductResponseToProduct } from '@/utils/conversions'
import { useWishlist } from '@/context/WishlistContext'

type UseWishlistLinesArgs = {
    size?: number
    page?: number
    orderBy?: SortKey
}

export const useWishlistLines = (args: UseWishlistLinesArgs) => {
    const { data: wishlist } = useWishlist()

    return useInfiniteQuery<Page<WishlistLine>>({
        queryKey: ['wishlistLines', args],
        queryFn: async ({ pageParam }) => {
            const pageData = await fetchWishlistLines({
                ...args,
                page: pageParam as number,
            })
            return {
                ...pageData,
                data: pageData.data.map(line => ({
                    id: line.id,
                    wishlistId: line.wishlistId,
                    product: mapProductResponseToProduct(line.product),
                })),
            }
        },
        initialPageParam: 1,
        getNextPageParam: lastPage => lastPage.nextPage,
        enabled: !!wishlist,
    })
}
