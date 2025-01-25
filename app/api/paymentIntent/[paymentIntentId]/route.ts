import { NextRequest, NextResponse } from 'next/server'

import { handleRoute } from '../../shared'
import { DynamicRoutePropsWithParams } from '@/types/api'
import { getPaymentIntent } from 'services/paymentIntent'

type Props = DynamicRoutePropsWithParams<{ paymentIntentId: string }>

export const GET = async (
    _: NextRequest,
    { params: { paymentIntentId } }: Props
) =>
    await handleRoute(async () => {
        const paymentIntent = await getPaymentIntent(paymentIntentId)
        return NextResponse.json(paymentIntent)
    })
