'use server'

import Stripe from 'stripe'
import stripe from '@/lib/stripe/server'
import { uuid } from 'short-uuid'

export async function getPaymentIntent(
    id: Stripe.PaymentIntent['id']
): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    return await stripe.paymentIntents.retrieve(id)
}

export async function createPaymentIntent(
    checkout: Checkout
): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    return await stripe.paymentIntents.create(
        {
            amount: checkout.total,
            currency: 'usd',
        },
        { idempotencyKey: uuid() }
    )
}
