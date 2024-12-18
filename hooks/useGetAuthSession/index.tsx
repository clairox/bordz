'use client'

import { useSupabase } from '@/context/SupabaseContext'
import { Session } from '@supabase/supabase-js'
import { useCallback } from 'react'

const useGetAuthSession = () => {
    const supabase = useSupabase()

    return useCallback(async (): Promise<Session | null> => {
        const {
            data: { session },
            error,
        } = await supabase.auth.getSession()
        if (error) {
            throw error
        }
        return session
    }, [supabase])
}

export default useGetAuthSession
