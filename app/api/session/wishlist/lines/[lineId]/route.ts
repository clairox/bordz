import { NextRequest, NextResponse } from 'next/server'

import { getRequiredRequestCookie, handleRoute } from '@/app/api/shared'
import { DynamicRoutePropsWithParams } from '@/types/api'
import { getWishlistItem, removeWishlistItem } from 'services/wishlist'

type Props = DynamicRoutePropsWithParams<{ lineId: string }>

export const GET = async (_: NextRequest, { params: { lineId } }: Props) =>
    await handleRoute(async () => {
        const wishlistItem = await getWishlistItem(lineId)
        return NextResponse.json(wishlistItem)
    })

export const DELETE = async (
    request: NextRequest,
    { params: { lineId } }: Props
) =>
    await handleRoute(async () => {
        const { value: wishlistId } = getRequiredRequestCookie(
            request,
            'wishlistId'
        )

        const updatedWishlist = await removeWishlistItem(wishlistId, lineId)
        return NextResponse.json(updatedWishlist)
    })
