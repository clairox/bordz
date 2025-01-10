'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { ComponentCreateArgs } from '@/types/api'
import { mapComponentResponseToComponent } from '@/utils/conversions'
import { createComponent } from '@/lib/api'

export const useCreateComponent = () => {
    const queryClient = useQueryClient()

    return useMutation<Component, Error, ComponentCreateArgs>({
        mutationFn: async args => {
            const data = await createComponent(args)
            return mapComponentResponseToComponent(data)
        },
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['components'] }),
    })
}
