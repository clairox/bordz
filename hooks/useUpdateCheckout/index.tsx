import { useMutation, useQueryClient } from '@tanstack/react-query'

import fetchAbsolute from '@/lib/fetchAbsolute'

const useUpdateCheckout = () => {
    const queryClient = useQueryClient()

    type UseUpdateCheckout = {
        email?: string
        shippingAddressId?: string
        subtotal?: number
        total?: number
        totalTax?: number
        totalShipping?: number
        paymentIntentId?: string
    }

    return useMutation({
        mutationFn: async (variables: UseUpdateCheckout) => {
            try {
                const res = await fetchAbsolute(`/checkout`, {
                    method: 'PATCH',
                    body: JSON.stringify(variables),
                })

                if (!res.ok) {
                    throw res
                }

                return await res.json()
            } catch (error) {
                throw error
            }
        },
        onSuccess: checkout => queryClient.setQueryData(['checkout'], checkout),
    })
}

export default useUpdateCheckout
