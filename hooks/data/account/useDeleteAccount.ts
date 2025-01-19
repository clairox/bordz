'use client'

import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useSupabase } from '@/context/SupabaseContext'
import { useGetSessionUserRole } from '@/hooks/auth'
import { killSession } from '@/utils/session'
import { deleteCustomer, fetchCart, fetchWishlist } from '@/lib/api'
import {
    mapCartResponseToCart,
    mapWishlistResponseToWishlist,
} from '@/utils/conversions'

type UseDeleteAccountArgs = { password: string }

export const useDeleteAccount = () => {
    const supabase = useSupabase()
    const queryClient = useQueryClient()
    const router = useRouter()
    const getSessionUserRole = useGetSessionUserRole()

    const login = async (email: string, password: string) => {
        const {
            data: { session },
            error,
        } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
            throw error
        }

        return session!
    }

    return useMutation<{ role: string } | void, Error, UseDeleteAccountArgs>({
        mutationFn: async ({ password }) => {
            const {
                data: { session },
            } = await supabase.auth.getSession()
            if (!session) {
                return
            }

            const { data, error: userError } = await supabase.auth.getUser(
                session.access_token
            )

            if (userError) {
                throw userError
            }

            const { user } = await login(data.user.email!, password)

            const role = await getSessionUserRole()

            const { error } = await supabase
                .from('deletion_requests')
                .insert({ user_id: user.id })
            if (error) {
                throw error
            }

            await deleteCustomer(user.id)

            if (role) {
                return { role }
            }
        },
        onSuccess: async data => {
            await killSession()

            if (data?.role === 'customer') {
                const newCart = mapCartResponseToCart(await fetchCart())
                const newWishlist = mapWishlistResponseToWishlist(
                    await fetchWishlist()
                )

                queryClient.setQueryData(['customer'], null)
                queryClient.setQueryData(['cart'], newCart)
                queryClient.setQueryData(['wishlist'], newWishlist)
            }

            router.push('/')
        },
    })
}
