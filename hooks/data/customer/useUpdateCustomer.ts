import { updateCustomer } from '@/lib/api'
import { CustomerUpdateArgs } from '@/types/api'
import { mapCustomerResponseToCustomer } from '@/utils/conversions'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateCustomer = (userId: string) => {
    const queryClient = useQueryClient()
    return useMutation<Customer, Error, CustomerUpdateArgs>({
        mutationFn: async args => {
            const data = await updateCustomer(userId, args)
            return mapCustomerResponseToCustomer(data)
        },
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ['customer', userId],
            }),
    })
}
