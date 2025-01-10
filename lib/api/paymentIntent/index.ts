import Stripe from 'stripe'

import fetchAbsolute from '@/lib/fetchAbsolute'

export const fetchPaymentIntent = async (
    id: string
): Promise<Stripe.PaymentIntent> => {
    return await fetchAbsolute<Stripe.PaymentIntent>(`/paymentIntent/${id}`)
}

export const createPaymentIntent = async (
    checkout: Checkout
): Promise<Stripe.PaymentIntent> => {
    return await fetchAbsolute<Stripe.PaymentIntent>('/paymentIntent', {
        method: 'POST',
        body: JSON.stringify({ checkout }),
    })
}
