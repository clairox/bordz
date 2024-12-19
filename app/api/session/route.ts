import { NextRequest, NextResponse } from 'next/server'
import { serialize } from 'cookie'
import * as jose from 'jose'

import { createBadRequestError, handleError } from '@/lib/errors'
import { DEFAULT_COOKIE_CONFIG } from '@/utils/constants'
import { decodeSessionToken } from '../shared'
import { db } from '@/drizzle/db'
import { CheckoutTable } from '@/drizzle/schema/checkout'
import { eq } from 'drizzle-orm'

export const POST = async (request: NextRequest) => {
    const { token } = (await request.json()) as { token: string }
    if (!token) {
        return handleError(createBadRequestError('Token is missing.'))
    }

    try {
        const existingSessionCookie = request.cookies.get('session')?.value
        if (existingSessionCookie === token) {
            const {
                user_metadata: { sub, email },
            } = decodeSessionToken(existingSessionCookie)

            return NextResponse.json({
                id: sub,
                email,
            })
        }

        const { exp, user_metadata } = decodeSessionToken(token)

        const cookie = serialize('session', token, {
            ...DEFAULT_COOKIE_CONFIG,
            maxAge: exp - Math.floor(Date.now() * 0.001),
        })

        const response = NextResponse.json({
            id: user_metadata.sub,
            email: user_metadata.email,
        })
        response.headers.append('Set-Cookie', cookie)

        return response
    } catch (error) {
        return handleError(error as Error)
    }
}

export const DELETE = async (request: NextRequest) => {
    const session = request.cookies.get('session')?.value
    if (!session) {
        return new NextResponse(null, { status: 204 })
    }

    const jwt = jose.decodeJwt(session)
    const userRole = jwt.user_role

    try {
        const sessionCookie = serialize('session', '', {
            ...DEFAULT_COOKIE_CONFIG,
            maxAge: -1,
        })

        const sbAuthTokenCookieNameBase = `sb-${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID!}-auth`
        const sbAuthTokenCookie = serialize(sbAuthTokenCookieNameBase, '', {
            ...DEFAULT_COOKIE_CONFIG,
            maxAge: -1,
        })

        const sbAuthTokenCodeVerifierCookie = serialize(
            sbAuthTokenCookieNameBase + '-code-verifier',
            '',
            {
                ...DEFAULT_COOKIE_CONFIG,
                maxAge: -1,
            }
        )

        const response = new NextResponse(null, { status: 204 })
        response.headers.append('Set-Cookie', sessionCookie)
        response.headers.append('Set-Cookie', sbAuthTokenCookie)
        response.headers.append('Set-Cookie', sbAuthTokenCodeVerifierCookie)

        if (userRole === 'customer') {
            const checkoutId = request.cookies.get('checkoutId')?.value
            if (checkoutId) {
                await db
                    .update(CheckoutTable)
                    .set({ cartId: null })
                    .where(eq(CheckoutTable.id, checkoutId))
            }

            const cartIdCookie = serialize('cartId', '', {
                ...DEFAULT_COOKIE_CONFIG,
                maxAge: -1,
            })

            const checkoutIdCookie = serialize('checkoutId', '', {
                ...DEFAULT_COOKIE_CONFIG,
                maxAge: -1,
            })

            const wishlistIdCookie = serialize('wishlistId', '', {
                ...DEFAULT_COOKIE_CONFIG,
                maxAge: -1,
            })

            response.headers.append('Set-Cookie', cartIdCookie)
            response.headers.append('Set-Cookie', checkoutIdCookie)
            response.headers.append('Set-Cookie', wishlistIdCookie)
        }

        return response
    } catch (error) {
        return handleError(error as Error)
    }
}
