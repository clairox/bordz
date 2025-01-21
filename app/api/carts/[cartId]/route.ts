import { NextRequest, NextResponse } from 'next/server'

import { getCart } from '@/lib/db'
import { createNotFoundError } from '@/lib/errors'
import { DynamicRoutePropsWithParams } from '@/types/api'
import { handleRoute } from '../../shared'

type Props = DynamicRoutePropsWithParams<{ cartId: string }>

export const GET = async (
    _request: NextRequest,
    { params: { cartId } }: Props
) =>
    await handleRoute(async () => {
        const cart = await getCart(cartId)
        if (!cart) {
            throw createNotFoundError('Cart')
        }

        return NextResponse.json(cart)
    })
