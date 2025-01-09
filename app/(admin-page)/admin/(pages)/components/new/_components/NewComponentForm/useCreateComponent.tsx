import fetchAbsolute from '@/lib/fetchAbsolute'
import { ComponentResponse } from '@/types/api'
import componentResponseToComponent from '@/utils/helpers/componentResponseToComponent'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type CreateComponentMutationVars = {
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

const createComponent = async (
    variables: CreateComponentMutationVars
): Promise<Component> => {
    const data = await fetchAbsolute<ComponentResponse>('/components', {
        method: 'POST',
        body: JSON.stringify(variables),
    })
    return componentResponseToComponent(data)
}

const useCreateComponent = () => {
    const queryClient = useQueryClient()

    return useMutation<Component, Error, CreateComponentMutationVars>({
        mutationFn: createComponent,
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['components'] }),
    })
}

export default useCreateComponent
