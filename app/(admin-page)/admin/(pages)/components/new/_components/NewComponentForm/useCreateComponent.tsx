'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { ComponentCreateArgs } from '@/types/api'
import componentResponseToComponent from '@/utils/helpers/componentResponseToComponent'
import { createComponent } from '@/lib/api'

const useCreateComponent = () => {
    const queryClient = useQueryClient()

    return useMutation<Component, Error, ComponentCreateArgs>({
        mutationFn: async args => {
            const data = await createComponent(args)
            return componentResponseToComponent(data)
        },
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['components'] }),
    })
}

export default useCreateComponent
