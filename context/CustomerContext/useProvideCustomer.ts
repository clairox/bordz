'use client'

import { useQuery } from '@tanstack/react-query'

import { useGetSessionUserRole } from '@/hooks/auth'
import { useSupabase } from '../SupabaseContext'
import { fetchCustomer } from '@/lib/api'
import { mapCustomerResponseToCustomer } from '@/utils/conversions'

export const useProvideCustomer = (initialData?: Customer) => {
    const supabase = useSupabase()
    const getSessionUserRole = useGetSessionUserRole()

    return useQuery<Customer | null>({
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
        initialData,
    })
}
