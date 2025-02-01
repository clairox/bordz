'use client'

import { createContext } from 'react'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { fetchSessionWishlist } from '@/lib/api'
import { mapWishlistResponseToWishlist } from '@/utils/conversions'

type WishlistContextValue = UseQueryResult<Wishlist, Error>
type WishlistProviderProps = React.PropsWithChildren

const WishlistContext = createContext<WishlistContextValue>(
    {} as WishlistContextValue
)

const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
    const wishlistQuery = useQuery<Wishlist>({
        queryKey: ['wishlist'],
        queryFn: async () => {
            const data = await fetchSessionWishlist()
            return mapWishlistResponseToWishlist(data)
        },
    })

    return (
        <WishlistContext.Provider value={wishlistQuery}>
            {children}
        </WishlistContext.Provider>
    )
}

export { WishlistProvider, WishlistContext }
