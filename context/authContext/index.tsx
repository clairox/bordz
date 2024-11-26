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

import fetchAbsolute from '@/lib/fetchAbsolute'
import { useSupabase } from '../supabaseContext'

type Auth = {
    id: string
    email: string
} | null

type CreateCustomerMutationVars = {
    userId: string
    firstName: string
    lastName: string
    birthDate: Date
    phone?: string
}

type AuthContextValue = {
    auth: UseQueryResult<Auth, Error>
    customer: UseQueryResult<Customer, Error>
    createCustomerMutation: UseMutationResult<
        Customer,
        Error,
        CreateCustomerMutationVars
    >
}

const AuthContext = createContext<AuthContextValue>({} as AuthContextValue)

const useAuthQuery = () => useContext(AuthContext)

const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const supabase = useSupabase()
    const queryClient = useQueryClient()

    const [isNewAccount, setIsNewAccount] = useState(true)

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

            return await res.json()
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

            return null
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

        return await createSession(session.access_token)
    }, [createSession, supabase.auth])

    // Set session cookie in backend
    const authQuery = useQuery<Auth>({
        queryKey: ['auth'],
        queryFn: async () => {
            try {
                const data = await initializeSession()
                if (!data) {
                    return null
                }

                return data
            } catch (error) {
                console.error(error)
                throw error
            }
        },
    })

    const customerQuery = useQuery<Customer>({
        queryKey: ['customer'],
        queryFn: async () => {
            try {
                if (!authQuery.data) {
                    throw new Error(
                        'customerQuery enabled without successful authQuery.'
                    )
                }

                const res = await fetchAbsolute(
                    `/customers?userId=${authQuery.data.id}`
                )

                if (!res.ok) {
                    throw res
                }

                queryClient.invalidateQueries({ queryKey: ['cart'] })
                return await res.json()
            } catch (error) {
                throw error
            }
        },
        enabled: authQuery.data != null && !isNewAccount,
    })

    const createCustomerMutation = useMutation<
        Customer,
        Error,
        CreateCustomerMutationVars
    >({
        mutationFn: async ({ userId, firstName, lastName, phone }) => {
            try {
                const res = await fetchAbsolute('/customers', {
                    method: 'POST',
                    body: JSON.stringify({
                        userId,
                        firstName,
                        lastName,
                        phone,
                    }),
                })

                if (!res.ok) {
                    throw res
                }

                setIsNewAccount(false)
                const customer = await res.json()
                queryClient.setQueryData(['customer'], customer)
                return customer
            } catch (error) {
                throw error
            }
        },
    })

    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log(event)
            if (event === 'INITIAL_SESSION') {
                if (session) {
                    const { data: profile } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('id', session.user.id)
                        .maybeSingle()

                    if (profile && !profile.is_new) {
                        setIsNewAccount(false)
                    }
                }
            }

            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                if (!session) {
                    throw new Error('Session is missing')
                }

                const auth = await createSession(session?.access_token)

                queryClient.setQueryData(['auth'], auth)

                const { data: profile } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .maybeSingle()

                if (profile && !profile.is_new) {
                    setIsNewAccount(false)
                    queryClient.invalidateQueries({ queryKey: ['customer'] })
                }
            }

            if (event === 'SIGNED_OUT') {
                queryClient.setQueryData(['customer'], null)

                setIsNewAccount(true)

                await killSession()

                queryClient.invalidateQueries({ queryKey: ['auth'] })
                queryClient.invalidateQueries({ queryKey: ['cart'] })
            }
        })

        return () => subscription.unsubscribe()
    }, [supabase, queryClient, createSession, killSession])

    return (
        <AuthContext.Provider
            value={{
                auth: authQuery,
                customer: customerQuery,
                createCustomerMutation,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, useAuthQuery }
