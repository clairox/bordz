'use client'

import { createClient } from '@/lib/supabase/client'
import { SupabaseClient } from '@supabase/supabase-js'
import { createContext, useContext } from 'react'

const supabase = createClient()
const SupabaseContext = createContext<SupabaseClient>(supabase)

const useSupabase = () => useContext(SupabaseContext)

const SupabaseProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <SupabaseContext.Provider value={supabase}>
            {children}
        </SupabaseContext.Provider>
    )
}

export { SupabaseProvider, useSupabase }
