import { fetchCustomers } from '@/lib/api'
import {
    InfiniteData,
    QueryKey,
    useSuspenseInfiniteQuery,
} from '@tanstack/react-query'

type UseCustomersArgs = FetchManyOptions

const useCustomers = (args?: UseCustomersArgs) => {
    return useSuspenseInfiniteQuery<
        Page<Customer>,
        Error,
        InfiniteData<Page<Customer>, unknown>,
        QueryKey,
        number
    >({
        queryKey: ['orders', args],
        queryFn: async ({ pageParam }) =>
            await fetchCustomers({ ...args, page: pageParam }),
        initialPageParam: 1,
        getNextPageParam: lastPage => lastPage.nextPage,
    })
}

export default useCustomers
