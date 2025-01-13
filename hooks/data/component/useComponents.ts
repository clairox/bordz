import {
    InfiniteData,
    QueryKey,
    useSuspenseInfiniteQuery,
} from '@tanstack/react-query'

import { fetchComponents } from '@/lib/api'
import { mapComponentResponseToComponent } from '@/utils/conversions'
import { PaginatedQueryOptions } from '@/types/api'

type UseComponentsArgs = PaginatedQueryOptions & {
    category?: string
}

export const useComponents = (args: UseComponentsArgs) => {
    return useSuspenseInfiniteQuery<
        Page<Component>,
        Error,
        InfiniteData<Page<Component>, number>,
        QueryKey,
        number
    >({
        queryKey: ['components', args],
        queryFn: async ({ pageParam }) => {
            const response = await fetchComponents({
                ...args,
                page: pageParam,
            })

            return {
                ...response,
                data: response.data.map(component =>
                    mapComponentResponseToComponent(component)
                ),
            }
        },
        initialPageParam: 1,
        getNextPageParam: lastPage => lastPage.nextPage,
    })
}
