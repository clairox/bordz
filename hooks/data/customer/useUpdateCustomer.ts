import { updateCustomer } from '@/lib/api'
import { CustomerUpdateArgs } from '@/types/api'
import { mapCustomerResponseToCustomer } from '@/utils/conversions'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateCustomer = () => {
    const queryClient = useQueryClient()
    type MutationArgs = { userId: string } & CustomerUpdateArgs
    return useMutation<Customer, Error, MutationArgs>({
        mutationFn: async ({ userId, ...args }) => {
            const data = await updateCustomer(userId, args)
            return mapCustomerResponseToCustomer(data)
        },
        onSuccess: ({ userId }) =>
            queryClient.invalidateQueries({
                queryKey: ['customer', userId],
            }),
    })
}
