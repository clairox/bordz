'use client'

import fetchAbsolute from '@/lib/fetchAbsolute'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

type SortType = 'date-desc' | 'recommended' | 'price-asc' | 'price-desc'

type FetchProductsOptions = {
    size?: number
    page?: number
    orderBy?: SortType
    publicOnly?: boolean
}

type UseProductsArgs = {
    size?: number
    page?: number
    orderBy?: SortType
}

const fetchProducts = async ({
    size,
    page,
    orderBy,
    publicOnly,
}: FetchProductsOptions) => {
    const response = await fetchAbsolute(
        `/products?size=${size}&page=${page}&orderBy=${orderBy}&publicOnly=${publicOnly}`
    )
    if (!response.ok) {
        throw response
    }
    return await response.json()
}

const useProducts = (args: UseProductsArgs) => {
    return useInfiniteQuery<Page<Product>>({
        queryKey: ['products'],
        queryFn: async ({ pageParam }) =>
            await fetchProducts({
                ...args,
                page: pageParam as number,
                publicOnly: true,
            }),
        initialPageParam: 1,
        getNextPageParam: lastPage => lastPage.nextPage,
    })
}

export default useProducts
