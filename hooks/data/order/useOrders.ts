import {
    InfiniteData,
    QueryKey,
    useSuspenseInfiniteQuery,
} from '@tanstack/react-query'

import { fetchOrders } from '@/lib/api'
import { mapOrderResponseToOrder } from '@/utils/conversions'
import { PaginatedQueryOptions } from '@/types/api'

type UseOrdersArgs = PaginatedQueryOptions & { customerId?: string }

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
