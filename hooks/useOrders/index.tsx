import { fetchOrders } from '@/lib/api'
import orderResponseToOrder from '@/utils/helpers/orderResponseToOrder'
import {
    InfiniteData,
    QueryKey,
    useSuspenseInfiniteQuery,
} from '@tanstack/react-query'

type UseOrdersArgs = { customerId?: string } & FetchManyOptions

const useOrders = (args?: UseOrdersArgs) => {
    return useSuspenseInfiniteQuery<
        Page<Order>,
        Error,
        InfiniteData<Page<Order>, unknown>,
        QueryKey,
        number
    >({
        queryKey: ['orders', args],
        queryFn: async ({ pageParam }) => {
            const response = await fetchOrders({ ...args, page: pageParam })
            return {
                ...response,
                data: response.data.map(order => orderResponseToOrder(order)),
            }
        },
        initialPageParam: 1,
        getNextPageParam: lastPage => lastPage.nextPage,
    })
}

export default useOrders
