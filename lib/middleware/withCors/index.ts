import { NextRequest, NextResponse } from 'next/server'

export const withCors = (request: NextRequest, response: NextResponse) => {
    const allowedOrigins = [
        'http://localhost:3000',
        'https://bordz.vercel.app',
        'https://bordz-clairox-clairoxs-projects.vercel.app',
    ]

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
