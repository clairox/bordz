'use client'

import {
    InfiniteData,
    QueryKey,
    useSuspenseInfiniteQuery,
} from '@tanstack/react-query'

import { fetchOrders } from '@/lib/api'
import { PaginatedQueryOptions } from '@/types/api'
import { mapOrderResponseToOrderAdminList } from '@/utils/conversions'

type UseAdminListOrdersArgs = PaginatedQueryOptions & { customerId?: string }

export const useAdminListOrders = (args?: UseAdminListOrdersArgs) => {
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
                    mapOrderResponseToOrderAdminList(order)
                ),
            }
        },
        initialPageParam: 1,
        getNextPageParam: lastPage => lastPage.nextPage,
    })
}
