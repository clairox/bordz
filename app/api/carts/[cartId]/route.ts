import { NextRequest, NextResponse } from 'next/server'

import { DynamicRoutePropsWithParams } from '@/types/api'
import { handleRoute } from '../../shared'
import { getCart } from 'services/cart'

type Props = DynamicRoutePropsWithParams<{ cartId: string }>

export const GET = async (
    _request: NextRequest,
    { params: { cartId } }: Props
) =>
    await handleRoute(async () => {
        const cart = await getCart(cartId)
        return NextResponse.json(cart)
    })
