'use client'

import { createContext } from 'react'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { fetchSessionWishlist } from '@/lib/api'
import { mapWishlistResponseToWishlist } from '@/utils/conversions'
import { useSessionCustomer } from '@/hooks/session'

type WishlistContextValue = UseQueryResult<Wishlist, Error>

const WishlistContext = createContext<WishlistContextValue>(
    {} as WishlistContextValue
)

type WishlistProviderProps = React.PropsWithChildren<{
    initialData?: Wishlist
}>

const WishlistProvider: React.FC<WishlistProviderProps> = ({
    initialData,
    children,
}) => {
    const { data: customer } = useSessionCustomer()

    const wishlistQuery = useQuery<Wishlist>({
        queryKey: ['wishlist'],
        queryFn: async () => {
            const data = await fetchSessionWishlist(customer?.id)
            return mapWishlistResponseToWishlist(data)
        },
        initialData,
    })

    return (
        <WishlistContext.Provider value={wishlistQuery}>
            {children}
        </WishlistContext.Provider>
    )
}

export { WishlistProvider, WishlistContext }
