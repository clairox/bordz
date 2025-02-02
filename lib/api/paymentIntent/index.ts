import Stripe from 'stripe'

import fetchAbsolute from '@/lib/fetchAbsolute'
import { PaymentIntentCreateArgs } from '@/types/api'

export const fetchPaymentIntent = async (
    id: string
): Promise<Stripe.PaymentIntent> => {
    return await fetchAbsolute<Stripe.PaymentIntent>(`/paymentIntent/${id}`)
}

export const createPaymentIntent = async (
    args: PaymentIntentCreateArgs
): Promise<Stripe.PaymentIntent> => {
    return await fetchAbsolute<Stripe.PaymentIntent>('/paymentIntent', {
        method: 'POST',
        body: JSON.stringify({ total: args.total }),
    })
}
