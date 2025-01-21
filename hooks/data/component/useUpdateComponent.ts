'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateComponent } from '@/lib/api'
import { ComponentUpdateArgs } from '@/types/api'
import { mapComponentResponseToComponent } from '@/utils/conversions'

export const useUpdateComponent = () => {
    const queryClient = useQueryClient()
    type MutationArgs = { id: string } & ComponentUpdateArgs
    return useMutation<Component, Error, MutationArgs>({
        mutationFn: async ({ id, ...args }) => {
            const data = await updateComponent(id, args)
            return mapComponentResponseToComponent(data)
        },
        onSuccess: ({ id }) =>
            queryClient.invalidateQueries({
                queryKey: ['components', id],
            }),
    })
}
