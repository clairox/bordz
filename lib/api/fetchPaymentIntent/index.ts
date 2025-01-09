import Stripe from 'stripe'

import fetchAbsolute from '@/lib/fetchAbsolute'

const fetchPaymentIntent = async (
    id: string
): Promise<Stripe.PaymentIntent> => {
    const response = await fetchAbsolute(`/paymentIntent/${id}`)
    if (!response.ok) {
        throw response
    }
    return await response.json()
}

export default fetchPaymentIntent
