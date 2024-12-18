'use client'

import { useCallback, useEffect, useState } from 'react'
import { Session } from '@supabase/supabase-js'

import { useAuth } from '@/context/AuthContext'
import { useSupabase } from '@/context/SupabaseContext'
import fetchAbsolute from '@/lib/fetchAbsolute'

const useAuthSession = () => {
    const { data: user } = useAuth()
    const supabase = useSupabase()
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        if (user) {
            supabase.auth
                .getSession()
                .then(async ({ data: { session }, error }) => {
                    if (error) {
                        throw error
                    }

                    setSession(session)
                })
        }
    }, [supabase.auth, user])

    return session
}

export default useAuthSession
