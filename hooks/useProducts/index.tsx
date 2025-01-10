'use client'

import { useInfiniteQuery } from '@tanstack/react-query'

import { fetchProducts } from '@/lib/api'
import productResponseToProduct from '@/utils/helpers/productResponseToProduct'

type UseProductsArgs = {
    size?: number
    page?: number
    orderBy?: SortKey
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
