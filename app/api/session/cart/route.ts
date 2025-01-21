import { NextRequest, NextResponse } from 'next/server'
import { and, eq, notInArray } from 'drizzle-orm'
import { serialize } from 'cookie'

import {
    getCart,
    createCart,
    getCartByOwnerId,
    handleRoute,
    getRequiredRequestCookie,
} from '../../shared'
import { db } from '@/drizzle/db'
import { CartLineItemTable, CartTable } from '@/drizzle/schema/cart'
import { createInternalServerError, createNotFoundError } from '@/lib/errors'
import {
    CART_ID_COOKIE_MAX_AGE,
    DEFAULT_COOKIE_CONFIG,
} from '@/utils/constants'
import { CartLineRecord, CartRecord } from '@/types/database'
import { expireCookies } from '@/utils/session'

export const POST = async (request: NextRequest) =>
    await handleRoute(async () => {
        const { customerId } = await request.json()

        if (customerId) {
            let customerCart = await getCartByOwnerId(customerId)

            if (!customerCart) {
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
                const cartId = request.cookies.get('cartId')?.value

                if (!cartId) {
                    const response = NextResponse.json(customerCart)
                    return addCartIdCookieToResponse(customerCart.id, response)
                } else if (cartId !== customerCart.id) {
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
                    const response = NextResponse.json(customerCart)
                    return response
                }
            }
        } else {
            const cartId = request.cookies.get('cartId')?.value

            if (cartId) {
                let guestCart = await getCart(cartId)

                if (!guestCart) {
                    guestCart = await createCart(customerId)

                    const response = NextResponse.json(guestCart)
                    return addCartIdCookieToResponse(guestCart.id, response)
                } else {
                    return NextResponse.json(guestCart)
                }
            } else {
                const newGuestCart = await createCart()

                const response = NextResponse.json(newGuestCart)
                return addCartIdCookieToResponse(newGuestCart.id, response)
            }
        }
    })

export const DELETE = async (request: NextRequest) =>
    await handleRoute(async () => {
        const { value: cartId } = getRequiredRequestCookie(request, 'cartId')

        const deletedCart = await db
            .delete(CartTable)
            .where(eq(CartTable.id, cartId))
            .returning()
            .then(rows => rows[0])

        if (!deletedCart) {
            throw createNotFoundError('Cart')
        }

        let response = new NextResponse(null, { status: 204 })
        response = expireCookies('cartId', response)
        return response
    })

type CartType = CartRecord & { lines: CartLineRecord[] }
const mergeCarts = async (target: CartType, source: CartType) => {
    if (source.lines.length === 0) {
        return await getCart(target.id)
    }

    const sourceLines = await db
        .select()
        .from(CartLineItemTable)
        .where(
            and(
                eq(CartLineItemTable.cartId, source.id),
                notInArray(
                    CartLineItemTable.productId,
                    target.lines.map(line => line.productId)
                )
            )
        )

    if (sourceLines.length) {
        await db.insert(CartLineItemTable).values(
            sourceLines.map(line => {
                return {
                    subtotal: line.subtotal,
                    total: line.total,
                    quantity: line.quantity,
                    productId: line.productId,
                    cartId: target.id,
                }
            })
        )
    }

    await db.delete(CartTable).where(eq(CartTable.id, source.id))

    if (sourceLines.length) {
        return await db
            .update(CartTable)
            .set({
                subtotal:
                    target.subtotal +
                    sourceLines.reduce(
                        (subtotal, line) => subtotal + line.subtotal,
                        0
                    ),
                total:
                    target.total +
                    sourceLines.reduce((total, line) => total + line.total, 0),
                totalQuantity: target.totalQuantity + sourceLines.length,
                updatedAt: new Date(),
            })
            .where(eq(CartTable.id, target.id))
            .returning()
            .then(async rows => {
                const id = rows[0].id
                return await getCart(id)
            })
    } else {
        return await getCart(target.id)
    }
}

const addCartIdCookieToResponse = (cartId: string, response: NextResponse) => {
    const cookie = serialize('cartId', cartId, {
        ...DEFAULT_COOKIE_CONFIG,
        maxAge: CART_ID_COOKIE_MAX_AGE,
    })

    response.headers.append('Set-Cookie', cookie)
    return response
}
