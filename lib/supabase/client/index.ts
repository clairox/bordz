import { createBrowserClient } from '@supabase/ssr'

const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const createClient = () => {
    return createBrowserClient(projectUrl!, anonKey!)
}

export { createClient }
