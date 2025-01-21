import { NextResponse } from 'next/server'
import { serialize } from 'cookie'

import { DEFAULT_COOKIE_CONFIG } from '../constants'

export const expireCookies = <TData>(
    names: string | string[],
    response: NextResponse<TData>
): NextResponse<TData> => {
    const _names = typeof names === 'string' ? [names] : names

    _names.forEach(name => {
        const cookie = serialize(name, '', {
            ...DEFAULT_COOKIE_CONFIG,
            maxAge: -1,
        })
        response.headers.append('Set-Cookie', cookie)
    })
    return response
}
