'use client'

import { createContext, useCallback, useContext, useEffect } from 'react'
import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { User } from '@supabase/supabase-js'

import fetchAbsolute from '@/lib/fetchAbsolute'
import { useSupabase } from '../supabaseContext'

type AuthContextValue = UseQueryResult<User | null, Error>

const AuthContext = createContext<AuthContextValue>({} as AuthContextValue)

const useAuthQuery = () => useContext(AuthContext)

const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const supabase = useSupabase()
    const queryClient = useQueryClient()

    const createSession = useCallback(async (token: string) => {
        try {
            const res = await fetchAbsolute('/session', {
                method: 'POST',
                body: JSON.stringify({
                    token,
                }),
            })

            if (!res.ok) {
                throw res
            }
        } catch (error) {
            throw error
        }
    }, [])

    const killSession = useCallback(async () => {
        try {
            const res = await fetchAbsolute(`/session`, {
                method: 'DELETE',
            })

            if (!res.ok) {
                throw res
            }
        } catch (error) {
            throw error
        }
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
            return { success: false }
        }

        createSession(session.access_token)
        return { success: true }
    }, [createSession, supabase.auth])

    const getSessionUser = useCallback(async () => {
        const {
            data: { user },
            error,
        } = await supabase.auth.getUser()

        if (error) {
            supabase.auth.signOut()
            killSession()
            throw error
        }

        if (!user) {
            supabase.auth.signOut()
            killSession()
            return null
        }

        return user
    }, [killSession, supabase.auth])

    const authQuery = useQuery<User | null>({
        queryKey: ['auth'],
        queryFn: async () => {
            try {
                const { success } = await initializeSession()
                if (!success) {
                    return null
                }

                return await getSessionUser()
            } catch (error) {
                console.error(error)
                throw error
            }
        },
    })

    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(() => {
            queryClient.invalidateQueries({ queryKey: ['auth'] })
        })

        return () => subscription.unsubscribe()
    }, [supabase.auth, queryClient])

    return (
        <AuthContext.Provider value={authQuery}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, useAuthQuery }
