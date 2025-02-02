import Stripe from 'stripe'

import * as db from 'db'
import { CreatePaymentIntentValues } from '@/types/services'

export async function getPaymentIntent(
    id: Stripe.PaymentIntent['id']
): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    return await db.getPaymentIntent(id)
}

export async function createPaymentIntent(
    values: CreatePaymentIntentValues
): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    return await db.createPaymentIntent(values)
}
