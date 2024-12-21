import { fetchOrders } from '@/lib/api'
import {
    InfiniteData,
    QueryKey,
    useSuspenseInfiniteQuery,
} from '@tanstack/react-query'

type UseOrdersArgs = FetchManyOptions

const useOrders = (args?: UseOrdersArgs) => {
    return useSuspenseInfiniteQuery<
        Page<Order>,
        Error,
        InfiniteData<Page<Order>, unknown>,
        QueryKey,
        number
    >({
        queryKey: ['orders', args],
        queryFn: async ({ pageParam }) =>
            await fetchOrders({ ...args, page: pageParam }),
        initialPageParam: 1,
        getNextPageParam: lastPage => lastPage.nextPage,
    })
}

export default useOrders
