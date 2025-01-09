import { fetchCustomers } from '@/lib/api'
import customerResponseToCustomer from '@/utils/helpers/customerResponseToCustomer'
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
        queryFn: async ({ pageParam }) => {
            const pageData = await fetchCustomers({ ...args, page: pageParam })
            return {
                ...pageData,
                data: pageData.data.map(customer =>
                    customerResponseToCustomer(customer)
                ),
            }
        },
        initialPageParam: 1,
        getNextPageParam: lastPage => lastPage.nextPage,
    })
}

export default useCustomers
