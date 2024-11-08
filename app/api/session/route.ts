import { NextRequest, NextResponse } from 'next/server'
import { serialize } from 'cookie'
import jwt, { JwtPayload } from 'jsonwebtoken'

import { createBadRequestError, handleError } from '@/lib/errors'
import { DEFAULT_COOKIE_CONFIG } from '@/utils/constants'

export const POST = async (request: NextRequest) => {
    const { token } = await request.json()
    if (!token) {
        return handleError(createBadRequestError('Token is missing.'))
    }

    try {
        const existingSessionCookie = request.cookies.get('session')?.value
        if (existingSessionCookie === token) {
            return NextResponse.json({ success: true })
        }

        const { exp } = jwt.verify(
            token,
            process.env.SUPABASE_JWT_SECRET || ''
        ) as JwtPayload

        if (!exp) {
            // TODO: createUnauthorized error or something like that
            throw new Error('Invalid token')
        }

        const cookie = serialize('session', token, {
            ...DEFAULT_COOKIE_CONFIG,
            maxAge: exp - Math.floor(Date.now() * 0.001),
        })

        const response = NextResponse.json({ success: true })
        response.headers.append('Set-Cookie', cookie)

        return response
    } catch (error) {
        return handleError(error as Error)
    }
}

export const DELETE = async () => {
    try {
        const cookie = serialize('session', '', {
            ...DEFAULT_COOKIE_CONFIG,
            maxAge: -1,
        })

        const response = new NextResponse(null, { status: 204 })
        response.headers.append('Set-Cookie', cookie)

        return response
    } catch (error) {
        return handleError(error as Error)
    }
}
