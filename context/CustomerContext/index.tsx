'use client'

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { useAuth } from '../AuthContext'
import fetchAbsolute from '@/lib/fetchAbsolute'
import { useSupabase } from '../SupabaseContext'
import { useGetAuthSession, useGetSessionUserRole } from '@/hooks'

type CustomerContextValue = UseQueryResult<Customer | null, Error>

const CustomerContext = createContext<CustomerContextValue>(
    {} as CustomerContextValue
)
const useCustomer = () => useContext(CustomerContext)

const fetchCustomer = async (userId: string) => {
    const response = await fetchAbsolute(`/customers/${userId}`)
    if (!response.ok) {
        throw response
    }
    return await response.json()
}

const useProvideCustomer = () => {
    const supabase = useSupabase()
    const { data: user, status: authStatus } = useAuth()
    const getAuthSession = useGetAuthSession()
    const getSessionUserRole = useGetSessionUserRole()
    const queryKey = ['customer', user?.id]

    const [isCustomerQueryEnabled, setIsCustomerQueryEnabled] = useState(false)

    const getUserProfile = useCallback(
        async (userId: string) => {
            const { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .maybeSingle()

            if (error) {
                throw error
            }

            if (!profile) {
                throw new Error('User profile has not been created.')
            }

            return profile
        },
        [supabase]
    )

    useEffect(() => {
        if (authStatus === 'pending') {
            setIsCustomerQueryEnabled(false)
            return
        }

        if (!user) {
            setIsCustomerQueryEnabled(true)
            return
        }

        getAuthSession().then(async session => {
            if (!session) {
                setIsCustomerQueryEnabled(true)
                return
            }
            const profile = await getUserProfile(session.user.id)
            if (!profile.is_new) {
                setIsCustomerQueryEnabled(true)
            }
        })
    }, [authStatus, user, getAuthSession, getUserProfile])

    return useQuery<Customer | null>({
        queryKey,
        queryFn: async () => {
            if (!user) {
                return null
            }

            const userRole = await getSessionUserRole()
            if (!userRole || userRole !== 'customer') {
                return null
            }

            return await fetchCustomer(user.id)
        },
        enabled: isCustomerQueryEnabled,
    })
}

const CustomerProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const customer = useProvideCustomer()

    return (
        <CustomerContext.Provider value={customer}>
            {children}
        </CustomerContext.Provider>
    )
}

export { useCustomer, CustomerProvider }
