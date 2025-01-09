import { NextRequest, NextResponse } from 'next/server'

import stripe from '@/lib/stripe/server'
import { handleRoute } from '../../shared'
import { DynamicRoutePropsWithParams } from '@/types/api'

type Props = DynamicRoutePropsWithParams<{ paymentIntentId: string }>

export const GET = async (
    _: NextRequest,
    { params: { paymentIntentId } }: Props
) =>
    await handleRoute(async () => {
        const paymentIntent =
            await stripe.paymentIntents.retrieve(paymentIntentId)
        return NextResponse.json(paymentIntent)
    })
