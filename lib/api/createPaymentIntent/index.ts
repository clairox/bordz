import Stripe from 'stripe'

import fetchAbsolute from '@/lib/fetchAbsolute'

const createPaymentIntent = async (
    checkout: Checkout
): Promise<Stripe.PaymentIntent> => {
    return await fetchAbsolute<Stripe.PaymentIntent>('/paymentIntent', {
        method: 'POST',
        body: JSON.stringify({ checkout }),
    })
}

export default createPaymentIntent
