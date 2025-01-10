import {
    InfiniteData,
    QueryKey,
    useSuspenseInfiniteQuery,
} from '@tanstack/react-query'

import { fetchCustomers } from '@/lib/api'
import { mapCustomerResponseToCustomer } from '@/utils/conversions'

type UseCustomersArgs = FetchManyOptions

export const useCustomers = (args?: UseCustomersArgs) => {
    return useSuspenseInfiniteQuery<
        Page<Customer>,
        Error,
        InfiniteData<Page<Customer>, unknown>,
        QueryKey,
        number
    >({
        queryKey: ['orders', args],
        queryFn: async ({ pageParam }) => {
            const pageData = await fetchCustomers({ ...args, page: pageParam })
            return {
                ...pageData,
                data: pageData.data.map(customer =>
                    mapCustomerResponseToCustomer(customer)
                ),
            }
        },
        initialPageParam: 1,
        getNextPageParam: lastPage => lastPage.nextPage,
    })
}
