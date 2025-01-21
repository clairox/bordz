'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateProduct } from '@/lib/api'
import { mapProductResponseToProduct } from '@/utils/conversions'
import { ProductUpdateArgs } from '@/types/api'

export const useUpdateProduct = () => {
    const queryClient = useQueryClient()
    type MutationArgs = { id: string } & ProductUpdateArgs
    return useMutation<Product, Error, MutationArgs>({
        mutationFn: async ({ id, ...args }) => {
            const data = await updateProduct(id, args)
            return mapProductResponseToProduct(data)
        },
        onSuccess: ({ id }) =>
            queryClient.invalidateQueries({
                queryKey: ['products', id],
            }),
    })
}
