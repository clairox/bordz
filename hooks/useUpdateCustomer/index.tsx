import { updateCustomer } from '@/lib/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useUpdateCustomer = (userId: string) => {
    const queryClient = useQueryClient()
    return useMutation<Customer, Error, UpdateCustomerArgs>({
        mutationFn: args => updateCustomer(userId, args),
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ['customer', userId],
            }),
    })
}

export default useUpdateCustomer
