'use client'

import { useInfiniteQuery } from '@tanstack/react-query'

import { fetchProducts } from '@/lib/api'
import { mapProductResponseToProduct } from '@/utils/conversions'

type UseProductsArgs = {
    size?: number
    page?: number
    orderBy?: SortKey
    publicOnly?: boolean
}

export const useProducts = (args: UseProductsArgs) => {
    return useInfiniteQuery<Page<Product>>({
        queryKey: ['products', args],
        queryFn: async ({ pageParam }) => {
            const response = await fetchProducts({
                ...args,
                page: pageParam as number,
                publicOnly: args.publicOnly ?? true,
            })

            return {
                ...response,
                data: response.data.map(product =>
                    mapProductResponseToProduct(product)
                ),
            }
        },
        initialPageParam: 1,
        getNextPageParam: lastPage => lastPage.nextPage,
    })
}
