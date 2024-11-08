import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const createClient = () => {
    const cookieStore = cookies()

    return createServerClient(projectUrl!, anonKey!, {
        cookies: {
            getAll: () => cookieStore.getAll(),
            setAll: cookiesToSet => {
                try {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        cookieStore.set(name, value, options)
                    )
                } catch {
                    // The `setAll` method was called from a Server Component.
                    // This can be ignored if you have middleware refreshing
                    // user sessions.
                }
            },
        },
    })
}

export { createClient }
