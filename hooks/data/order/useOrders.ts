import { InfiniteData, QueryKey, useInfiniteQuery } from '@tanstack/react-query'

import { fetchOrders } from '@/lib/api'
import { mapOrderResponseToOrder } from '@/utils/conversions'
import { PaginatedQueryOptions } from '@/types/api'
import { useSessionCustomer } from '@/hooks/session'

type UseOrdersArgs = PaginatedQueryOptions

export const useOrders = (args?: UseOrdersArgs) => {
    const { data: customer } = useSessionCustomer()

    return useInfiniteQuery<
        Page<Order>,
        Error,
        InfiniteData<Page<Order>, unknown>,
        QueryKey,
        number
    >({
        queryKey: ['orders', args],
        queryFn: async ({ pageParam }) => {
            const response = await fetchOrders({
                ...args,
                customerId: customer!.id,
                page: pageParam,
            })
            return {
                ...response,
                data: response.data.map(order =>
                    mapOrderResponseToOrder(order)
                ),
            }
        },
        initialPageParam: 1,
        getNextPageParam: lastPage => lastPage.nextPage,
        enabled: !!customer,
    })
}
