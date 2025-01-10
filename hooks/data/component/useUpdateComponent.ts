'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateComponent } from '@/lib/api'
import { ComponentUpdateArgs } from '@/types/api'
import { mapComponentResponseToComponent } from '@/utils/conversions'

export const useUpdateComponent = (componentId: string) => {
    const queryClient = useQueryClient()
    return useMutation<Component, Error, ComponentUpdateArgs>({
        mutationFn: async args => {
            const data = await updateComponent(componentId, args)
            return mapComponentResponseToComponent(data)
        },
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ['components', componentId],
            }),
    })
}
