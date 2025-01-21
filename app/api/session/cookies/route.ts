import { NextRequest, NextResponse } from 'next/server'
import { handleRoute } from '../../shared'
import { DEFAULT_COOKIE_CONFIG } from '@/utils/constants'
import { serialize } from 'cookie'
import { db } from '@/drizzle/db'
import { CheckoutTable } from '@/drizzle/schema/checkout'
import { eq } from 'drizzle-orm'

export const DELETE = async (request: NextRequest) =>
    await handleRoute(async () => {
        const checkoutId = request.cookies.get('checkoutId')?.value
        if (checkoutId) {
            await db
                .update(CheckoutTable)
                .set({ cartId: null })
                .where(eq(CheckoutTable.id, checkoutId))
        }

        let response = new NextResponse(null, { status: 204 })
        response = appendExpiredCartCookie(response)
        response = appendExpiredWishlistCookie(response)
        response = appendExpiredCheckoutCookie(response)

        return response
    })

const appendExpiredCartCookie = (response: NextResponse): NextResponse => {
    const cookie = serialize('cartId', '', {
        ...DEFAULT_COOKIE_CONFIG,
        maxAge: -1,
    })
    response.headers.append('Set-Cookie', cookie)
    return response
}

const appendExpiredWishlistCookie = (response: NextResponse): NextResponse => {
    const cookie = serialize('wishlistId', '', {
        ...DEFAULT_COOKIE_CONFIG,
        maxAge: -1,
    })
    response.headers.append('Set-Cookie', cookie)
    return response
}

const appendExpiredCheckoutCookie = (response: NextResponse): NextResponse => {
    const cookie = serialize('cartId', '', {
        ...DEFAULT_COOKIE_CONFIG,
        maxAge: -1,
    })
    response.headers.append('Set-Cookie', cookie)
    return response
}
