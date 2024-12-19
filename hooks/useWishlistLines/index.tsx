import { useWishlist } from '@/context/WishlistContext'
import fetchAbsolute from '@/lib/fetchAbsolute'
import { useInfiniteQuery } from '@tanstack/react-query'

type FetchWishlistLinesOptions = {
    size?: number
    page?: number
    orderBy?: SortKey
}

type UseWishlistLinesArgs = {
    size?: number
    page?: number
    orderBy?: SortKey
}

const fetchWishlistLines = async ({
    size,
    page,
    orderBy,
}: FetchWishlistLinesOptions) => {
    const params = []
    if (size != undefined) {
        params.push(`size=${size}`)
    }

    if (page != undefined) {
        params.push(`page=${page}`)
    }

    if (orderBy) {
        params.push(`orderBy=${orderBy}`)
    }

    const paramString = params.length ? '?' + params.join('&') : ''
    const path = '/wishlist/lines' + paramString
    const response = await fetchAbsolute(path)
    if (!response.ok) {
        throw response
    }
    return await response.json()
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
