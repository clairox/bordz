'use client'

import { useSuspenseInfiniteQuery } from '@tanstack/react-query'

import { fetchProducts } from '@/lib/api'
import { mapProductResponseToProduct } from '@/utils/conversions'
import { PaginatedQueryOptions } from '@/types/api'

type UseProductsArgs = PaginatedQueryOptions & { publicOnly?: boolean }

export const useProducts = (args: UseProductsArgs) => {
    return useSuspenseInfiniteQuery<Page<Product>>({
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
