'use client'

import {
    FetchNextPageOptions,
    InfiniteData,
    InfiniteQueryObserverResult,
} from '@tanstack/react-query'

import { useCombinedPages } from '@/hooks'

type InfiniteItemListProps<T> = {
    pages: Page<T>[]
    hasNextPage: boolean
    fetchNextPage: (
        options?: FetchNextPageOptions
    ) => Promise<
        InfiniteQueryObserverResult<InfiniteData<Page<T>, unknown>, Error>
    >
    render: (items: T[]) => JSX.Element
    autoFetch?: boolean
}

const InfiniteItemList = <T extends object>({
    pages,
    hasNextPage,
    fetchNextPage,
    render,
    autoFetch = false, // TODO: automatically fetchNextPage upon scrolling to bottom
}: InfiniteItemListProps<T>) => {
    const items = useCombinedPages(pages)

    return (
        <div>
            {render(items)}
            {hasNextPage && (
                <button onClick={() => fetchNextPage()}>Load more</button>
            )}
        </div>
    )
}

export default InfiniteItemList
