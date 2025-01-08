'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateProduct } from '@/lib/api'

type UseUpdateProductArgs = {
    title?: string
    featuredImage?: string
    price?: number
    isPublic?: boolean
}

const useUpdateProduct = (productId: string) => {
    const queryClient = useQueryClient()
    return useMutation<Product, Error, UseUpdateProductArgs>({
        mutationFn: async args => await updateProduct(productId, args),
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ['products', productId],
            }),
    })
}

export default useUpdateProduct
