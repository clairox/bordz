import { NextRequest, NextResponse } from 'next/server'

import {
    getRequestOptionsParams,
    getRequiredRequestCookie,
    handleRoute,
    PostWishlistItemSchema,
} from '../../../shared'
import {
    addWishlistItem,
    getWishlistItemsByWishlistId,
} from 'services/wishlist'
import { chkRequest } from '@/lib/validator'

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
        const data = await chkRequest(PostWishlistItemSchema, request)
        const updatedWishlist = await addWishlistItem(wishlistId, data)
        return NextResponse.json(updatedWishlist)
    })
