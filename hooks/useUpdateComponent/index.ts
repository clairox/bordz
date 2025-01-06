'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateComponent } from '@/lib/api'

type UseUpdateComponentArgs = {
    title: string
    price: number
    images?: string[]
    model?: string
    description?: string
    specifications?: string[]
    totalInventory: number
    category: string
    vendor: string
    size: string
    color: string
}

const useUpdateComponent = (componentId: string) => {
    const queryClient = useQueryClient()
    return useMutation<Component, Error, UseUpdateComponentArgs>({
        mutationFn: async args => await updateComponent(componentId, args),
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ['components', componentId],
            }),
    })
}

export default useUpdateComponent
