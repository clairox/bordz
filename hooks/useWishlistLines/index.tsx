import { useInfiniteQuery } from '@tanstack/react-query'

import { useWishlist } from '@/context/WishlistContext'
import { fetchWishlistLines } from '@/lib/api'
import productResponseToProduct from '@/utils/helpers/productResponseToProduct'

type UseWishlistLinesArgs = {
    size?: number
    page?: number
    orderBy?: SortKey
}

const useWishlistLines = (args: UseWishlistLinesArgs) => {
    const { data: wishlist } = useWishlist()

    return useInfiniteQuery<Page<WishlistLine>>({
        queryKey: ['wishlistLines', wishlist?.quantity, args],
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
                    product: productResponseToProduct(line.product),
                })),
            }
        },
        initialPageParam: 1,
        getNextPageParam: lastPage => lastPage.nextPage,
        enabled: !!wishlist,
    })
}

export default useWishlistLines
