'use client'

import {
    FetchNextPageOptions,
    InfiniteData,
    InfiniteQueryObserverResult,
} from '@tanstack/react-query'

import { useCombinedPages } from '@/hooks/common'
import { Fragment } from 'react'

type InfiniteListProps<T> = {
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

const InfiniteList = <T extends object>({
    pages,
    hasNextPage,
    fetchNextPage,
    render,
    autoFetch = false, // TODO: automatically fetchNextPage upon scrolling to bottom
}: InfiniteListProps<T>) => {
    const items = useCombinedPages(pages)

    return (
        <Fragment>
            {render(items)}
            {hasNextPage && (
                <button onClick={() => fetchNextPage()}>Load more</button>
            )}
        </Fragment>
    )
}

export default InfiniteList
