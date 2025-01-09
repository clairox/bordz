'use client'

import { createContext, useCallback, useContext } from 'react'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

import fetchAbsolute from '@/lib/fetchAbsolute'
import { useSupabase } from '../SupabaseContext'

type AuthInfo = {
    id: string
    email: string
}

type Auth = AuthInfo | null

type AuthContextValue = UseQueryResult<Auth, Error>

const AuthContext = createContext<AuthContextValue>({} as AuthContextValue)

const useAuth = () => useContext(AuthContext)

const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const supabase = useSupabase()

    const storeSession = useCallback(async (token: string) => {
        return await fetchAbsolute<AuthInfo>('/session', {
            method: 'POST',
            body: JSON.stringify({
                token,
            }),
        })
    }, [])

    const initializeSession = useCallback(async () => {
        const {
            data: { session },
            error,
        } = await supabase.auth.getSession()

        if (error) {
            throw error
        }

        if (!session) {
            return null
        }

        return await storeSession(session.access_token)
    }, [storeSession, supabase.auth])

    const auth = useQuery<Auth>({
        queryKey: ['auth'],
        queryFn: async () => {
            const data = await initializeSession()
            if (!data) {
                return null
            }
            return data
        },
    })

    return (
        <AuthContext.Provider value={{ ...auth }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, useAuth }
