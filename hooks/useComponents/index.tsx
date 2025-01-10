import {
    InfiniteData,
    QueryKey,
    useSuspenseInfiniteQuery,
} from '@tanstack/react-query'

import { fetchComponents } from '@/lib/api'
import componentResponseToComponent from '@/utils/helpers/componentResponseToComponent'

type UseComponentsArgs = {
    category?: string
    size?: number
    page?: number
    orderBy?: SortKey
}

const useComponents = (args: UseComponentsArgs) => {
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
                    componentResponseToComponent(component)
                ),
            }
        },
        initialPageParam: 1,
        getNextPageParam: lastPage => lastPage.nextPage,
    })
}

export default useComponents
