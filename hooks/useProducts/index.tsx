'use client'

import fetchAbsolute from '@/lib/fetchAbsolute'
import { ProductResponse } from '@/types/api'
import productResponseToProduct from '@/utils/helpers/productResponseToProduct'
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
}: FetchProductsOptions): Promise<Page<ProductResponse>> => {
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
        queryFn: async ({ pageParam }) => {
            const response = await fetchProducts({
                ...args,
                page: pageParam as number,
                publicOnly: true,
            })

            return {
                ...response,
                data: response.data.map(product =>
                    productResponseToProduct(product)
                ),
            }
        },
        initialPageParam: 1,
        getNextPageParam: lastPage => lastPage.nextPage,
    })
}

export default useProducts
