import { NextResponse } from 'next/server'
import { serialize, SerializeOptions } from 'cookie'

import { DEFAULT_COOKIE_CONFIG } from '../constants'

export const appendCookie = <TData>(
    name: string,
    value: string,
    response: NextResponse<TData>,
    options: SerializeOptions = DEFAULT_COOKIE_CONFIG
): NextResponse<TData> => {
    const cookie = serialize(name, value, {
        ...DEFAULT_COOKIE_CONFIG,
        ...options,
    })
    response.headers.append('Set-Cookie', cookie)
    return response
}
