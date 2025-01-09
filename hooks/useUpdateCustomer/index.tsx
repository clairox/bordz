import { updateCustomer } from '@/lib/api'
import { CustomerUpdateArgs } from '@/types/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useUpdateCustomer = (userId: string) => {
    const queryClient = useQueryClient()
    return useMutation<Customer, Error, CustomerUpdateArgs>({
        mutationFn: args => updateCustomer(userId, args),
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ['customer', userId],
            }),
    })
}

export default useUpdateCustomer
