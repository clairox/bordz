import { NextRequest, NextResponse } from 'next/server'

import {
    getRequiredRequestCookie,
    handleRoute,
    validateRequestBody,
} from '@/app/api/shared'
import { addCartLine, clearCart } from 'services/cart'

export const POST = async (request: NextRequest) =>
    await handleRoute(async () => {
        const { value: cartId } = getRequiredRequestCookie(request, 'cartId')
        const data = await request.json()
        validateRequestBody(data, ['productId', 'quantity'])

        const updatedCart = await addCartLine(cartId, {
            productId: data.productId,
            quantity: data.quantity,
        })

        return NextResponse.json(updatedCart)
    })

export const DELETE = async (request: NextRequest) =>
    await handleRoute(async () => {
        const { value: cartId } = getRequiredRequestCookie(request, 'cartId')

        const updatedCart = clearCart(cartId)
        return NextResponse.json(updatedCart)
    })
