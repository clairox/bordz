'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateProduct } from '@/lib/api'
import { mapProductResponseToProduct } from '@/utils/conversions'
import { ProductUpdateArgs } from '@/types/api'

export const useUpdateProduct = (productId: string) => {
    const queryClient = useQueryClient()
    return useMutation<Product, Error, ProductUpdateArgs>({
        mutationFn: async args => {
            const data = await updateProduct(productId, args)
            return mapProductResponseToProduct(data)
        },
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ['products', productId],
            }),
    })
}
