import { NextRequest, NextResponse } from 'next/server'

import {
    getRequiredRequestCookie,
    handleRoute,
    PostCartLineSchema,
} from '@/app/api/shared'
import { addCartLine, clearCart } from 'services/cart'
import { chkRequest } from '@/lib/validator'

export const POST = async (request: NextRequest) =>
    await handleRoute(async () => {
        const { value: cartId } = getRequiredRequestCookie(request, 'cartId')
        const data = await chkRequest(PostCartLineSchema, request)
        const updatedCart = await addCartLine(cartId, data)

        return NextResponse.json(updatedCart)
    })

export const DELETE = async (request: NextRequest) =>
    await handleRoute(async () => {
        const { value: cartId } = getRequiredRequestCookie(request, 'cartId')

        const updatedCart = clearCart(cartId)
        return NextResponse.json(updatedCart)
    })
