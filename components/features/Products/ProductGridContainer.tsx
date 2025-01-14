'use client'

import { useSearchParams } from 'next/navigation'

import {
    DEFAULT_ITEM_GRID_COLUMN_COUNT,
    DEFAULT_PAGE_SIZE,
    DEFAULT_SORT_KEY,
} from '@/utils/constants'
import InfiniteList from '@/components/common/InfiniteList'
import { ProductGrid } from './ProductGrid'
import { useProducts } from '@/hooks/data/product'
import { SortKey } from '@/types/sorting'

export const ProductGridContainer = () => {
    const searchParams = useSearchParams()
    const pageSize = Number(searchParams.get('size') ?? DEFAULT_PAGE_SIZE)
    const orderBy = (searchParams.get('orderBy') as SortKey) ?? DEFAULT_SORT_KEY
    const columnCount = Number(
        searchParams.get('cols') ?? DEFAULT_ITEM_GRID_COLUMN_COUNT
    )

    const { data, hasNextPage, fetchNextPage } = useProducts({
        size: pageSize,
        orderBy,
    })

    return (
        <InfiniteList
            pages={data.pages}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            render={products => (
                <ProductGrid products={products} columnCount={columnCount} />
            )}
        />
    )
}
