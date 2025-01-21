import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useSupabase } from '@/context/SupabaseContext'
import { useGetSessionUserRole } from '.'
import { clearSessionCookies } from '@/utils/session'
import { fetchSessionCart, fetchSessionWishlist } from '@/lib/api'
import {
    mapCartResponseToCart,
    mapWishlistResponseToWishlist,
} from '@/utils/conversions'

export const useSignOut = () => {
    const supabase = useSupabase()
    const queryClient = useQueryClient()
    const getSessionUserRole = useGetSessionUserRole()

    return useMutation({
        mutationFn: async () => {
            const userRole = await getSessionUserRole()

            const { error } = await supabase.auth.signOut()
            if (error) {
                throw error
            }

            if (userRole) {
                return { role: userRole }
            }
        },
        onSuccess: async data => {
            if (data?.role === 'customer') {
                await clearSessionCookies()
                const newCart = mapCartResponseToCart(await fetchSessionCart())
                const newWishlist = mapWishlistResponseToWishlist(
                    await fetchSessionWishlist()
                )

                queryClient.setQueryData(['customer'], null)
                queryClient.setQueryData(['cart'], newCart)
                queryClient.setQueryData(['wishlist'], newWishlist)
            }
        },
    })
}
