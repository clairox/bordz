import fetchAbsolute from '@/lib/fetchAbsolute'
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

const createComponent = async (variables: CreateComponentMutationVars) => {
    try {
        const response = await fetchAbsolute('/components', {
            method: 'POST',
            body: JSON.stringify(variables),
        })

        if (!response.ok) {
            throw response
        }

        return await response.json()
    } catch (error) {
        throw error
    }
}

const useCreateComponent = () => {
    const queryClient = useQueryClient()

    return useMutation<Component[], Error, CreateComponentMutationVars>({
        mutationFn: createComponent,
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['components'] }),
    })
}

export default useCreateComponent
