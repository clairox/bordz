'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import Stripe from 'stripe'

import { createPaymentIntent, fetchPaymentIntent } from '@/lib/api'

export const usePaymentIntentQuery = (checkout: Checkout) => {
    return useSuspenseQuery<Stripe.PaymentIntent>({
        queryKey: ['paymentIntent', checkout.id],
        queryFn: async () => {
            if (!checkout.paymentIntentId) {
                return await createPaymentIntent({ total: checkout.total })
            }
            return await fetchPaymentIntent(checkout.paymentIntentId)
        },
    })
}
