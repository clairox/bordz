import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { serialize } from 'cookie'

import { getCart, createCart, getCartByOwnerId } from '../shared'
import { db } from '@/drizzle/db'
import { CartLineItemTable, CartTable } from '@/drizzle/schema/cart'
import {
    createBadRequestError,
    createInternalServerError,
    createNotFoundError,
    handleError,
} from '@/lib/errors'
import {
    CART_ID_COOKIE_MAX_AGE,
    DEFAULT_COOKIE_CONFIG,
} from '@/utils/constants'
import { CartLineRecord, CartRecord } from '@/types/records'

export const POST = async (request: NextRequest) => {
    const { customerId } = await request.json()
    console.log('Customer id: ', customerId)

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

        const mergeCarts = async (
            targetCart: CartRecord & { lines: CartLineRecord[] },
            sourceCart: CartRecord & { lines: CartLineRecord[] }
        ) => {
            if (sourceCart.lines.length === 0) {
                return await getCart(targetCart.id)
            }

            await db
                .insert(CartLineItemTable)
                .values(
                    sourceCart.lines.map(line => {
                        return {
                            subtotal: line.subtotal,
                            total: line.total,
                            quantity: line.quantity,
                            productId: line.productId,
                            cartId: targetCart.id,
                        }
                    })
                )
                .returning()

            await db.delete(CartTable).where(eq(CartTable.id, sourceCart.id))

            return await db
                .update(CartTable)
                .set({
                    subtotal: targetCart.subtotal + sourceCart.subtotal,
                    total: targetCart.total + sourceCart.total,
                    totalQuantity:
                        targetCart.totalQuantity + sourceCart.totalQuantity,
                    updatedAt: new Date(),
                })
                .returning()
                .then(async rows => {
                    const id = rows[0].id
                    return await getCart(id)
                })
        }

        if (customerId) {
            console.log('customerId exists')
            let customerCart = await getCartByOwnerId(customerId)

            if (!customerCart) {
                console.log('no customerCart found')
                customerCart = await createCart(customerId)

                const cartId = request.cookies.get('cartId')?.value
                const guestCart = cartId ? await getCart(cartId) : null

                if (guestCart) {
                    customerCart = await mergeCarts(customerCart, guestCart)
                }

                if (!customerCart) {
                    throw createInternalServerError()
                }

                const response = NextResponse.json(customerCart)
                return addCartIdCookieToResponse(customerCart.id, response)
            } else {
                console.log('customerCart found')
                const cartId = request.cookies.get('cartId')?.value

                if (!cartId) {
                    console.log('customerCart id cookie not set')
                    const response = NextResponse.json(customerCart)
                    return addCartIdCookieToResponse(customerCart.id, response)
                } else if (cartId !== customerCart.id) {
                    console.log('cartId cookie is not customerCart')

                    const guestCart = await getCart(cartId)
                    if (guestCart) {
                        customerCart = await mergeCarts(customerCart, guestCart)
                    }

                    if (!customerCart) {
                        throw createInternalServerError()
                    }

                    const response = NextResponse.json(customerCart)
                    return addCartIdCookieToResponse(customerCart.id, response)
                } else {
                    console.log('customerCart id cookie already set')
                    const response = NextResponse.json(customerCart)
                    return response
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
                    console.log('Guest cart id:', guestCart.id)
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
