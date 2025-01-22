import {
    InfiniteData,
    QueryKey,
    useSuspenseInfiniteQuery,
} from '@tanstack/react-query'

import { fetchBoardComponents } from '@/lib/api'
import { mapBoardComponentResponseToBoardComponent } from '@/utils/conversions'
import { PaginatedQueryOptions } from '@/types/api'

type UseBoardComponentsArgs = PaginatedQueryOptions & {
    category?: string
}

export const useBoardComponents = (args: UseBoardComponentsArgs) => {
    return useSuspenseInfiniteQuery<
        Page<BoardComponent>,
        Error,
        InfiniteData<Page<BoardComponent>, number>,
        QueryKey,
        number
    >({
        queryKey: ['boardComponents', args],
        queryFn: async ({ pageParam }) => {
            const response = await fetchBoardComponents({
                ...args,
                page: pageParam,
            })

            return {
                ...response,
                data: response.data.map(boardComponent =>
                    mapBoardComponentResponseToBoardComponent(boardComponent)
                ),
            }
        },
        initialPageParam: 1,
        getNextPageParam: lastPage => lastPage.nextPage,
    })
}
