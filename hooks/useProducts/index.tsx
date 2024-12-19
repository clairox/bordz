'use client'

import fetchAbsolute from '@/lib/fetchAbsolute'
import { useInfiniteQuery } from '@tanstack/react-query'

type FetchProductsOptions = {
    size?: number
    page?: number
    orderBy?: SortKey
    publicOnly?: boolean
}

type UseProductsArgs = {
    size?: number
    page?: number
    orderBy?: SortKey
}

const fetchProducts = async ({
    size,
    page,
    orderBy,
    publicOnly,
}: FetchProductsOptions) => {
    const params = []
    if (size != undefined) {
        params.push(`size=${size}`)
    }

    if (page != undefined) {
        params.push(`page=${page}`)
    }

    if (orderBy) {
        params.push(`orderBy=${orderBy}`)
    }

    if (publicOnly) {
        params.push(`publicOnly=${publicOnly}`)
    }

    const paramString = params.length ? '?' + params.join('&') : ''
    const path = '/products' + paramString
    const response = await fetchAbsolute(path)
    if (!response.ok) {
        throw response
    }
    return await response.json()
}

const useProducts = (args: UseProductsArgs) => {
    return useInfiniteQuery<Page<Product>>({
        queryKey: ['products', args],
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
