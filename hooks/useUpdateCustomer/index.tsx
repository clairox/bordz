import { updateCustomer } from '@/lib/api'
import { CustomerUpdateArgs } from '@/types/api'
import customerResponseToCustomer from '@/utils/helpers/customerResponseToCustomer'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useUpdateCustomer = (userId: string) => {
    const queryClient = useQueryClient()
    return useMutation<Customer, Error, CustomerUpdateArgs>({
        mutationFn: async args => {
            const data = await updateCustomer(userId, args)
            return customerResponseToCustomer(data)
        },
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ['customer', userId],
            }),
    })
}

export default useUpdateCustomer
