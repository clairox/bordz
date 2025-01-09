import fetchAbsolute from '@/lib/fetchAbsolute'
import { ComponentResponse } from '@/types/api'
import { buildParamString } from '@/utils/helpers'
import componentResponseToComponent from '@/utils/helpers/componentResponseToComponent'
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

const fetchComponents = async (
    options?: FetchComponentsOptions
): Promise<Page<ComponentResponse>> => {
    let path = '/components'
    if (options) {
        path = path.concat(buildParamString(options))
    }

    return await fetchAbsolute<Page<ComponentResponse>>(path)
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
