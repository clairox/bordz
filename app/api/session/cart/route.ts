import { NextRequest, NextResponse } from 'next/server'

import { handleRoute, getRequiredRequestCookie } from '../../shared'
import { createNotFoundError } from '@/lib/errors'
import { CART_ID_COOKIE_MAX_AGE } from '@/utils/constants'
import { appendCookie, expireCookies } from '@/utils/session'
import {
    getCart,
    createCart,
    deleteCart,
    getCustomerCart,
    mergeCarts,
} from 'services/cart'
import { CartQueryResult } from '@/types/queries'

export const POST = async (request: NextRequest) =>
    await handleRoute(async () => {
        const { customerId } = await request.json()
        const sessionCartId = request.cookies.get('cartId')?.value

        if (customerId) {
            const customerCart = await getCustomerCart(customerId)
            const guestCart = sessionCartId
                ? await getCart(sessionCartId)
                : undefined

            if (guestCart) {
                const mergedCart = await mergeCarts(guestCart, customerCart)
                return createCartResponse(mergedCart)
            } else {
                return createCartResponse(customerCart)
            }
        } else {
            let guestCart = sessionCartId
                ? await getCart(sessionCartId)
                : undefined

            if (guestCart) {
                return createCartResponse(guestCart)
            } else {
                guestCart = await createCart()
                return createCartResponse(guestCart)
            }
        }
    })

export const DELETE = async (request: NextRequest) =>
    await handleRoute(async () => {
        const { value: cartId } = getRequiredRequestCookie(request, 'cartId')

        await deleteCart(cartId)
        let response = new NextResponse(null, { status: 204 })
        response = expireCookies('cartId', response)
        return response
    })

const appendCartCookie = (
    value: string,
    response: NextResponse<CartQueryResult>
): NextResponse<CartQueryResult> => {
    return appendCookie('cartId', value, response, {
        maxAge: CART_ID_COOKIE_MAX_AGE,
    })
}

const createCartResponse = (
    cart: CartQueryResult
): NextResponse<CartQueryResult> => {
    const response = NextResponse.json(cart)
    return appendCartCookie(cart.id, response)
}
