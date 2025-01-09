import Stripe from 'stripe'

import fetchAbsolute from '@/lib/fetchAbsolute'

const createPaymentIntent = async (
    checkout: Checkout
): Promise<Stripe.PaymentIntent> => {
    const response = await fetchAbsolute('/paymentIntent', {
        method: 'POST',
        body: JSON.stringify({ checkout }),
    })

    if (!response.ok) {
        throw response
    }

    return await response.json()
}

export default createPaymentIntent
