import { fetchOrders } from '@/lib/api'
import orderResponseToOrderAdminList from '@/utils/helpers/orderResponseToOrderAdminList'
import {
    InfiniteData,
    QueryKey,
    useSuspenseInfiniteQuery,
} from '@tanstack/react-query'

type UseOrdersArgs = { customerId?: string } & FetchManyOptions

const useAdminListOrders = (args?: UseOrdersArgs) => {
    return useSuspenseInfiniteQuery<
        Page<OrderAdminList>,
        Error,
        InfiniteData<Page<OrderAdminList>, unknown>,
        QueryKey,
        number
    >({
        queryKey: ['orders', args],
        queryFn: async ({ pageParam }) => {
            const response = await fetchOrders({ ...args, page: pageParam })
            return {
                ...response,
                data: response.data.map(order =>
                    orderResponseToOrderAdminList(order)
                ),
            }
        },
        initialPageParam: 1,
        getNextPageParam: lastPage => lastPage.nextPage,
    })
}

export default useAdminListOrders
