import fetchAbsolute from '@/lib/fetchAbsolute'
import { buildParamString } from '@/utils/helpers'
import {
    InfiniteData,
    QueryKey,
    useSuspenseInfiniteQuery,
} from '@tanstack/react-query'

type FetchComponentsOptions = {
    category?: string
    size?: number
    page?: number
    orderBy?: SortKey
}

type UseComponentsArgs = {
    category?: string
    size?: number
    page?: number
    orderBy?: SortKey
}

const fetchComponents = async ({
    category,
    size,
    page,
    orderBy,
}: FetchComponentsOptions) => {
    const path =
        '/components' + buildParamString({ category, size, page, orderBy })
    const response = await fetchAbsolute(path)
    if (!response.ok) {
        throw response
    }
    return await response.json()
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
        queryFn: async ({ pageParam }) =>
            await fetchComponents({
                ...args,
                page: pageParam,
            }),
        initialPageParam: 1,
        getNextPageParam: lastPage => lastPage.nextPage,
    })
}

export default useComponents
