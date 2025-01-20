import { NextRequest, NextResponse } from 'next/server'

import { getWishlist } from '@/drizzle/db/handlers'
import { createNotFoundError } from '@/lib/errors'
import { DynamicRoutePropsWithParams } from '@/types/api'
import { handleRoute } from '../../shared'

type Props = DynamicRoutePropsWithParams<{ wishlistId: string }>

export const GET = async (
    _request: NextRequest,
    { params: { wishlistId } }: Props
) =>
    await handleRoute(async () => {
        const cart = await getWishlist(wishlistId)
        if (!cart) {
            throw createNotFoundError('Cart')
        }

        return NextResponse.json(cart)
    })
