'use client'

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react'
import {
    useMutation,
    UseMutationResult,
    useQuery,
    useQueryClient,
    UseQueryResult,
} from '@tanstack/react-query'
import * as jose from 'jose'

import fetchAbsolute from '@/lib/fetchAbsolute'
import { useSupabase } from '../SupabaseContext'

type Auth = {
    id: string
    email: string
} | null

// type CreateCustomerMutationVars = {
//     userId: string
//     firstName: string
//     lastName: string
//     birthDate: Date
//     phone?: string
// }

type AuthContextValue = UseQueryResult<Auth, Error>
// customer: UseQueryResult<Customer, Error>
// createCustomerMutation: UseMutationResult<
//     Customer,
//     Error,
//     CreateCustomerMutationVars
// >

const AuthContext = createContext<AuthContextValue>({} as AuthContextValue)

const useAuth = () => useContext(AuthContext)

const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const supabase = useSupabase()
    const queryClient = useQueryClient()

    // const [isNewAccount, setIsNewAccount] = useState(true)

    const storeSession = useCallback(async (token: string) => {
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

            return await res.json()
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

    // const customerQuery = useQuery<Customer>({
    //     queryKey: ['customer'],
    //     queryFn: async () => {
    //         try {
    //             if (!authQuery.data) {
    //                 throw new Error(
    //                     'customerQuery enabled without successful authQuery.'
    //                 )
    //             }
    //
    //             const res = await fetchAbsolute(
    //                 `/customers?userId=${authQuery.data.id}`
    //             )
    //
    //             if (!res.ok) {
    //                 throw res
    //             }
    //
    //             queryClient.invalidateQueries({ queryKey: ['cart'] })
    //             return await res.json()
    //         } catch (error) {
    //             throw error
    //         }
    //     },
    //     enabled: authQuery.data != null && !isNewAccount,
    // })

    // const createCustomerMutation = useMutation<
    //     Customer,
    //     Error,
    //     CreateCustomerMutationVars
    // >({
    //     mutationFn: async ({ userId, firstName, lastName, phone }) => {
    //         try {
    //             const res = await fetchAbsolute('/customers', {
    //                 method: 'POST',
    //                 body: JSON.stringify({
    //                     userId,
    //                     firstName,
    //                     lastName,
    //                     phone,
    //                 }),
    //             })
    //
    //             if (!res.ok) {
    //                 throw res
    //             }
    //
    //             setIsNewAccount(false)
    //             const customer = await res.json()
    //             queryClient.setQueryData(['customer'], customer)
    //             return customer
    //         } catch (error) {
    //             throw error
    //         }
    //     },
    // })

    // useEffect(() => {
    //     const {
    //         data: { subscription },
    //     } = supabase.auth.onAuthStateChange(async (event, session) => {
    //         if (event === 'INITIAL_SESSION') {
    //             if (session) {
    //                 const jwt = jose.decodeJwt(session.access_token)
    //                 const userRole = jwt.user_role
    //                 if (userRole === 'admin') {
    //                     return
    //                 }
    //
    //                 const { data: profile } = await supabase
    //                     .from('profiles')
    //                     .select('*')
    //                     .eq('id', session.user.id)
    //                     .maybeSingle()
    //
    //                 if (profile && !profile.is_new) {
    //                     setIsNewAccount(false)
    //                 }
    //             }
    //         }
    //
    //         if (
    //             event === 'SIGNED_IN' ||
    //             event === 'TOKEN_REFRESHED' ||
    //             event === 'USER_UPDATED'
    //         ) {
    //             if (!session) {
    //                 throw new Error('Session is missing')
    //             }
    //
    //             const auth = await createSession(session?.access_token)
    //
    //             queryClient.setQueryData(['auth'], auth)
    //
    //             const jwt = jose.decodeJwt(session.access_token)
    //             const userRole = jwt.user_role
    //             if (userRole === 'admin') {
    //                 return
    //             }
    //
    //             const { data: profile } = await supabase
    //                 .from('profiles')
    //                 .select('*')
    //                 .eq('id', session.user.id)
    //                 .maybeSingle()
    //
    //             if (profile && !profile.is_new) {
    //                 setIsNewAccount(false)
    //                 queryClient.invalidateQueries({ queryKey: ['customer'] })
    //             }
    //         }
    //
    //         if (event === 'SIGNED_OUT') {
    //             const wasCustomer =
    //                 queryClient.getQueryData(['customer']) != undefined
    //             queryClient.setQueryData(['customer'], null)
    //
    //             setIsNewAccount(true)
    //
    //             await killSession()
    //
    //             queryClient.invalidateQueries({ queryKey: ['auth'] })
    //             if (wasCustomer) {
    //                 queryClient.invalidateQueries({ queryKey: ['cart'] })
    //             }
    //         }
    //     })
    //
    //     return () => subscription.unsubscribe()
    // }, [supabase, queryClient, createSession, killSession])

    return (
        <AuthContext.Provider value={{ ...auth }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, useAuth }
