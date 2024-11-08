import { NextRequest, NextResponse } from 'next/server'
import { updateSession } from './lib/supabase/middleware'
import { withCors } from './lib/middleware/withCors'

export const middleware = async (request: NextRequest) => {
    const supabaseResponse = await updateSession(request)

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

    if (request.nextUrl.pathname === '/account') {
        const url = request.nextUrl.origin + '/account/settings'
        return NextResponse.redirect(url)
    }

    const response = withCors(request, supabaseResponse)
    return response
}
