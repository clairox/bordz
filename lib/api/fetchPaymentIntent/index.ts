import Stripe from 'stripe'

import fetchAbsolute from '@/lib/fetchAbsolute'

const fetchPaymentIntent = async (
    id: string
): Promise<Stripe.PaymentIntent> => {
    return await fetchAbsolute<Stripe.PaymentIntent>(`/paymentIntent/${id}`)
}

export default fetchPaymentIntent
