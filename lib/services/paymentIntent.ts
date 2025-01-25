import Stripe from 'stripe'

import * as db from 'db'

export async function getPaymentIntent(
    id: Stripe.PaymentIntent['id']
): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    return await db.getPaymentIntent(id)
}

export async function createPaymentIntent(
    checkout: Checkout
): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    return await db.createPaymentIntent(checkout)
}
