import { NextRequest, NextResponse } from 'next/server'

import {
    getRequestOptionsParams,
    getRequiredRequestCookie,
    handleRoute,
    validateRequestBody,
} from '../../../shared'
import {
    addWishlistItem,
    getWishlistItemsByWishlistId,
} from 'services/wishlist'

export const GET = async (request: NextRequest) =>
    await handleRoute(async () => {
        const { value: wishlistId } = getRequiredRequestCookie(
            request,
            'wishlistId'
        )
        const options = getRequestOptionsParams(request)
        const data = await getWishlistItemsByWishlistId(wishlistId, options)
        return NextResponse.json(data)
    })

export const POST = async (request: NextRequest) =>
    await handleRoute(async () => {
        const { value: wishlistId } = getRequiredRequestCookie(
            request,
            'wishlistId'
        )
        const data = await request.json()
        validateRequestBody(data, ['productId'])
        const updatedWishlist = await addWishlistItem(wishlistId, {
            productId: data.productId,
        })
        return NextResponse.json(updatedWishlist)
    })
