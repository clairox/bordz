import { useCallback } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import Stripe from 'stripe'

import fetchAbsolute from '@/lib/fetchAbsolute'

const usePaymentIntentQuery = (checkout: Checkout) => {
    const createPaymentIntent = useCallback(async () => {
        try {
            const res = await fetchAbsolute('/paymentIntent', {
                method: 'POST',
                body: JSON.stringify({ checkout }),
            })

            if (!res.ok) {
                throw res
            }

            return await res.json()
        } catch (error) {
            throw error
        }
    }, [checkout])

    return useSuspenseQuery<Stripe.PaymentIntent>({
        queryKey: ['paymentIntent', checkout.id],
        queryFn: async () => {
            if (!checkout.paymentIntentId) {
                return await createPaymentIntent()
            }

            try {
                const res = await fetchAbsolute(
                    `/paymentIntent/${checkout.paymentIntentId}`
                )

                if (!res.ok) {
                    throw res
                }

                return await res.json()
            } catch (error) {
                throw error
            }
        },
    })
}

export default usePaymentIntentQuery
