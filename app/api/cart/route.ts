import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { serialize } from 'cookie'

import { getCart } from '../shared'
import { db } from '@/drizzle/db'
import { CartTable } from '@/drizzle/schema/cart'
import {
    createBadRequestError,
    createInternalServerError,
    createNotFoundError,
    handleError,
} from '@/lib/errors'
import { DEFAULT_COOKIE_CONFIG } from '@/utils/constants'

const createCart = async () => {
    const newCart = await db
        .insert(CartTable)
        .values({})
        .returning()
        .then(async rows => await getCart(rows[0].id))

    if (!newCart) {
        throw createInternalServerError('Failed to create cart.')
    }

    return newCart
}

export const GET = async (request: NextRequest) => {
    const cartId = request.cookies.get('cartId')?.value

    try {
        const cart = cartId ? await getCart(cartId) : undefined

        if (!cart) {
            const newCart = await createCart()

            const cookie = serialize('cartId', newCart.id, {
                ...DEFAULT_COOKIE_CONFIG,
                maxAge: 60 * 60 * 24 * 14,
            })

            const response = NextResponse.json(newCart)
            response.headers.append('Set-Cookie', cookie)

            return response
        }

        return NextResponse.json(cart)
    } catch (error) {
        handleError(error)
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
