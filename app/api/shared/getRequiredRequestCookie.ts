import { NextRequest } from 'next/server'

import { createBadRequestError } from '@/lib/errors'

export const getRequiredRequestCookie = (
    request: NextRequest,
    name: string
) => {
    const cookie = request.cookies.get(name)
    if (!cookie) {
        throw createBadRequestError(`Missing required cookie: "${name}"`)
    }
    return cookie
}
