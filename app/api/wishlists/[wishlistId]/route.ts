import { NextRequest, NextResponse } from 'next/server'

import { DynamicRoutePropsWithParams } from '@/types/api'
import { handleRoute } from '../../shared'
import { getWishlist } from 'services/wishlist'

type Props = DynamicRoutePropsWithParams<{ wishlistId: string }>

export const GET = async (
    _request: NextRequest,
    { params: { wishlistId } }: Props
) =>
    await handleRoute(async () => {
        const wishlist = await getWishlist(wishlistId)
        return NextResponse.json(wishlist)
    })
