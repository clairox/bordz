import { useSuspenseInfiniteQuery } from '@tanstack/react-query'

import { fetchWishlistLines } from '@/lib/api'
import { mapProductResponseToProduct } from '@/utils/conversions'

type UseWishlistLinesArgs = {
    size?: number
    page?: number
    orderBy?: SortKey
}

export const useWishlistLines = (args: UseWishlistLinesArgs) => {
    return useSuspenseInfiniteQuery<Page<WishlistLine>>({
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
    })
}
