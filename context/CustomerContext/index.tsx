'use client'

import { createContext } from 'react'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { useSupabase } from '../SupabaseContext'
import { useGetSessionUserRole } from '@/hooks/auth'
import { fetchCustomer } from '@/lib/api'
import { mapCustomerResponseToCustomer } from '@/utils/conversions'

type CustomerContextValue = UseQueryResult<Customer | null>
type CustomerProviderProps = React.PropsWithChildren

const CustomerContext = createContext<CustomerContextValue>(
    {} as CustomerContextValue
)

const CustomerProvider: React.FC<CustomerProviderProps> = ({ children }) => {
    const supabase = useSupabase()
    const getSessionUserRole = useGetSessionUserRole()

    const customer = useQuery<Customer | null>({
        queryKey: ['customer'],
        queryFn: async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession()
            if (!session) {
                return null
            }

            const {
                data: { user },
                error,
            } = await supabase.auth.getUser(session.access_token)

            if (error) {
                throw error
            }

            const userRole = await getSessionUserRole()
            if (!userRole || userRole !== 'customer') {
                return null
            }

            const response = await fetchCustomer(user!.id)
            return mapCustomerResponseToCustomer(response)
        },
    })

    return (
        <CustomerContext.Provider value={customer}>
            {children}
        </CustomerContext.Provider>
    )
}

export { CustomerContext, CustomerProvider }
