import { NextRequest, NextResponse } from 'next/server'

export const middleware = (request: NextRequest) => {
    const allowedOrigins = [
        'http://localhost:3000',
        'https://bordz.vercel.app',
        'https://bordz-clairox-clairoxs-projects.vercel.app',
    ]

    const withCors = (response: NextResponse) => {
        const origin = request.headers.get('origin')
        if (origin && allowedOrigins.includes(origin)) {
            response.headers.append('Access-Control-Allow-Origin', origin)
        }
        response.headers.append(
            'Access-Control-Allow-Methods',
            'GET, POST, PATCH, DELETE, OPTIONS'
        )
        response.headers.append('Access-Control-Allow-Headers', 'content-type')
        return response
    }

    if (
        request.nextUrl.pathname === '/checkout' &&
        request.nextUrl.searchParams.get('payment_intent_client_secret')
    ) {
        const referer = request.headers.get('referer')
        if (!referer) {
            return NextResponse.redirect(request.nextUrl.origin)
        }

        const url = new URL(referer)
        if (url.pathname !== '/checkout') {
            return NextResponse.redirect(request.nextUrl.origin)
        }
    }

    return withCors(NextResponse.next())
}
