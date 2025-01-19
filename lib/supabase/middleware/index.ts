import { NextResponse, NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

import { getUserRole } from '@/utils/session'

const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const updateSession = async (request: NextRequest) => {
    let supabaseResponse = NextResponse.next({ request })

    const supabase = createServerClient(projectUrl!, anonKey!, {
        cookies: {
            getAll: () => request.cookies.getAll(),
            setAll: cookiesToSet => {
                cookiesToSet.forEach(({ name, value }) =>
                    request.cookies.set(name, value)
                )
                supabaseResponse = NextResponse.next({ request })

                cookiesToSet.forEach(({ name, value, options }) =>
                    supabaseResponse.cookies.set(name, value, options)
                )
            },
        },
    })

    // IMPORTANT: Avoid writing any logic between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.

    const {
        data: { user },
    } = await supabase.auth.getUser()

    const {
        data: { session },
    } = await supabase.auth.getSession()

    // TODO: Admin sign in and customer sign in should only work for respective roles
    if (session) {
        const pathname = request.nextUrl.pathname

        if (!pathname.startsWith('/_next') && !pathname.startsWith('/api')) {
            const userRole = getUserRole(session)
            // console.log(
            //     `Requesting ${request.nextUrl.pathname} with role '${userRole}'.`
            // )

            if (userRole === 'admin') {
                if (
                    !pathname.startsWith('/admin') ||
                    pathname.startsWith('/admin/login')
                ) {
                    const url = request.nextUrl.clone()
                    url.pathname = '/admin'
                    return NextResponse.redirect(url)
                }
            } else if (userRole === 'customer') {
                if (pathname.startsWith('/admin')) {
                    const url = request.nextUrl.clone()
                    url.pathname = '/'
                    return NextResponse.redirect(url)
                }
            }
        }
    } else if (
        !session &&
        request.nextUrl.pathname.startsWith('/admin') &&
        !request.nextUrl.pathname.startsWith('/admin/login')
    ) {
        const url = request.nextUrl.clone()
        url.pathname = '/admin/login'
        return NextResponse.redirect(url)
    }

    if (!user && request.nextUrl.pathname.startsWith('/account')) {
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }

    if (user && request.nextUrl.pathname.startsWith('/login')) {
        const url = request.nextUrl.clone()
        url.pathname = '/'
        return NextResponse.redirect(url)
    }

    // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
    // creating a new response object with NextResponse.next() make sure to:
    // 1. Pass the request in it, like so:
    //    const myNewResponse = NextResponse.next({ request })
    // 2. Copy over the cookies, like so:
    //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
    // 3. Change the myNewResponse object to fit your needs, but avoid changing
    //    the cookies!
    // 4. Finally:
    //    return myNewResponse
    // If this is not done, you may be causing the browser and server to go out
    // of sync and terminate the user's session prematurely!

    return supabaseResponse
}

export { updateSession }
