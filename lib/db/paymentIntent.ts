'use server'

import Stripe from 'stripe'
import stripe from '@/lib/stripe/server'
import { uuid } from 'short-uuid'
import { CreatePaymentIntentValues } from '@/types/services'

export async function getPaymentIntent(
    id: Stripe.PaymentIntent['id']
): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    return await stripe.paymentIntents.retrieve(id)
}

export async function createPaymentIntent(
    values: CreatePaymentIntentValues
): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    return await stripe.paymentIntents.create(
        {
            amount: values.total,
            currency: 'usd',
        },
        { idempotencyKey: uuid() }
    )
}
