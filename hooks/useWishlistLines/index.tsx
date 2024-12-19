import { useWishlist } from '@/context/WishlistContext'
import fetchAbsolute from '@/lib/fetchAbsolute'
import { useInfiniteQuery } from '@tanstack/react-query'

type SortType = 'date-desc' | 'recommended' | 'price-asc' | 'price-desc'

type FetchWishlistLinesOptions = {
    size?: number
    page?: number
    orderBy?: SortType
}

type UseWishlistLinesArgs = {
    size?: number
    page?: number
    orderBy?: SortType
}

const fetchWishlistLines = async ({
    size,
    page,
    orderBy,
}: FetchWishlistLinesOptions) => {
    const response = await fetchAbsolute(
        `/wishlist/lines?size=${size}&page=${page}&orderBy=${orderBy}`
    )
    if (!response.ok) {
        throw response
    }
    return await response.json()
}

const useWishlistLines = (args: UseWishlistLinesArgs) => {
    const { data: wishlist } = useWishlist()

    return useInfiniteQuery<Page<WishlistLine>>({
        queryKey: ['wishlistLines', wishlist?.quantity],
        queryFn: async ({ pageParam }) =>
            fetchWishlistLines({ ...args, page: pageParam as number }),
        initialPageParam: 1,
        getNextPageParam: lastPage => lastPage.nextPage,
        enabled: !!wishlist,
    })
}

export default useWishlistLines
