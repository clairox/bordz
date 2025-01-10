import {
    InfiniteData,
    QueryKey,
    useSuspenseInfiniteQuery,
} from '@tanstack/react-query'

import { fetchOrders } from '@/lib/api'
import { mapOrderResponseToOrder } from '@/utils/conversions'

type UseOrdersArgs = { customerId?: string } & FetchManyOptions

export const useOrders = (args?: UseOrdersArgs) => {
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
                data: response.data.map(order =>
                    mapOrderResponseToOrder(order)
                ),
            }
        },
        initialPageParam: 1,
        getNextPageParam: lastPage => lastPage.nextPage,
    })
}
