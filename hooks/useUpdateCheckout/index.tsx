import { useMutation, useQueryClient } from '@tanstack/react-query'

import updateCheckout from '@/lib/api/updateCheckout'

type UpdateCheckout = {
    email?: string
    shippingAddressId?: string
    subtotal?: number
    total?: number
    totalTax?: number
    totalShipping?: number
    paymentIntentId?: string
}

const useUpdateCheckout = () => {
    const queryClient = useQueryClient()

    return useMutation<Checkout, Error, UpdateCheckout>({
        mutationFn: args => updateCheckout(args),
        onSuccess: checkout => queryClient.setQueryData(['checkout'], checkout),
    })
}

export default useUpdateCheckout
