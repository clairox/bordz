import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { serialize } from 'cookie'

import { getCart, createCart, getCartByOwnerId } from '../shared'
import { db } from '@/drizzle/db'
import { CartTable } from '@/drizzle/schema/cart'
import {
    createBadRequestError,
    createNotFoundError,
    handleError,
} from '@/lib/errors'
import {
    CART_ID_COOKIE_MAX_AGE,
    DEFAULT_COOKIE_CONFIG,
} from '@/utils/constants'

export const POST = async (request: NextRequest) => {
    const { customerId } = await request.json()

    try {
        const addCartIdCookieToResponse = (
            cartId: string,
            response: NextResponse
        ) => {
            const cookie = serialize('cartId', cartId, {
                ...DEFAULT_COOKIE_CONFIG,
                maxAge: CART_ID_COOKIE_MAX_AGE,
            })

            response.headers.append('Set-Cookie', cookie)
            return response
        }

        if (customerId) {
            console.log('customerId exists')
            let customerCart = await getCartByOwnerId(customerId)

            if (!customerCart) {
                console.log('no customerCart found')
                customerCart = await createCart(customerId)

                const response = NextResponse.json(customerCart)
                return addCartIdCookieToResponse(customerCart.id, response)
            } else {
                console.log('customerCart found')
                const cartId = request.cookies.get('cartId')?.value

                const response = NextResponse.json(customerCart)
                if (cartId === customerCart.id) {
                    console.log('customerCart id cookie already set')
                    return response
                } else {
                    console.log('customerCart id cookie not set')
                    return addCartIdCookieToResponse(customerCart.id, response)
                }
            }
        } else {
            console.log('customerId does not exist')
            const cartId = request.cookies.get('cartId')?.value

            if (cartId) {
                console.log('guestCart id cookie already set')
                let guestCart = await getCart(cartId)

                if (!guestCart) {
                    console.log('no guestCart found')
                    guestCart = await createCart(customerId)

                    const response = NextResponse.json(guestCart)
                    return addCartIdCookieToResponse(guestCart.id, response)
                } else {
                    console.log('guestCart found')
                    return NextResponse.json(guestCart)
                }
            } else {
                console.log('guestCart id cookie not set')
                const newGuestCart = await createCart()

                const response = NextResponse.json(newGuestCart)
                return addCartIdCookieToResponse(newGuestCart.id, response)
            }
        }
    } catch (error) {
        return handleError(error as Error)
    }
}

export const DELETE = async (request: NextRequest) => {
    const cartId = request.cookies.get('cartId')?.value
    if (!cartId) {
        return handleError(createBadRequestError('cartId cookie is missing.'))
    }

    try {
        const deletedCart = await db
            .delete(CartTable)
            .where(eq(CartTable.id, cartId))
        if (!deletedCart) {
            throw createNotFoundError('Cart')
        }

        const cookie = serialize('cartId', '', {
            ...DEFAULT_COOKIE_CONFIG,
            maxAge: -1,
        })

        const response = new NextResponse(null, { status: 204 })
        response.headers.append('Set-Cookie', cookie)

        return response
    } catch (error) {
        return handleError(error)
    }
}
