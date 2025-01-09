import { useInfiniteQuery } from '@tanstack/react-query'

import { useWishlist } from '@/context/WishlistContext'
import { fetchWishlistLines } from '@/lib/api'

type UseWishlistLinesArgs = {
    size?: number
    page?: number
    orderBy?: SortKey
}

const useWishlistLines = (args: UseWishlistLinesArgs) => {
    const { data: wishlist } = useWishlist()

    return useInfiniteQuery<Page<WishlistLine>>({
        queryKey: ['wishlistLines', wishlist?.quantity, args],
        queryFn: async ({ pageParam }) =>
            fetchWishlistLines({ ...args, page: pageParam as number }),
        initialPageParam: 1,
        getNextPageParam: lastPage => lastPage.nextPage,
        enabled: !!wishlist,
    })
}

export default useWishlistLines
