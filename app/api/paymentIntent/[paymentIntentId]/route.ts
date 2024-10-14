import handleError from '@/lib/errorHandling'
import stripe from '@/lib/stripe/server'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (
    _: NextRequest,
    context: { params: { paymentIntentId: string } }
) => {
    const { paymentIntentId } = context.params

    try {
        const paymentIntent =
            await stripe.paymentIntents.retrieve(paymentIntentId)

        return NextResponse.json(paymentIntent)
    } catch (error) {
        handleError(error)
    }
}
