import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateCheckout } from '@/lib/api'
import { CheckoutUpdateArgs } from '@/types/api'
import { mapCheckoutResponseToCheckout } from '@/utils/conversions'

export const useUpdateCheckout = () => {
    const queryClient = useQueryClient()

    return useMutation<Checkout, Error, CheckoutUpdateArgs>({
        mutationFn: async args => {
            const data = await updateCheckout(args)
            return mapCheckoutResponseToCheckout(data)
        },
        onSuccess: checkout => queryClient.setQueryData(['checkout'], checkout),
    })
}
