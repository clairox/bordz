'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateProduct } from '@/lib/api'
import productResponseToProduct from '@/utils/helpers/productResponseToProduct'
import { ProductUpdateArgs } from '@/types/api'

const useUpdateProduct = (productId: string) => {
    const queryClient = useQueryClient()
    return useMutation<Product, Error, ProductUpdateArgs>({
        mutationFn: async args => {
            const data = await updateProduct(productId, args)
            return productResponseToProduct(data)
        },
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ['products', productId],
            }),
    })
}

export default useUpdateProduct
