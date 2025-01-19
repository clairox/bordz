'use client'

import { createContext, useContext } from 'react'
import { useSuspenseQuery, UseSuspenseQueryResult } from '@tanstack/react-query'

import { useCustomer } from '../CustomerContext'
import { fetchWishlist } from '@/lib/api'
import { mapWishlistResponseToWishlist } from '@/utils/conversions'

type WishlistContextValue = UseSuspenseQueryResult<Wishlist, Error>

const WishlistContext = createContext<WishlistContextValue>(
    {} as WishlistContextValue
)

const useWishlist = () => useContext(WishlistContext)

type WishlistProviderProps = React.PropsWithChildren<{
    initialData?: Wishlist
}>

const WishlistProvider: React.FC<WishlistProviderProps> = ({
    initialData,
    children,
}) => {
    const { data: customer } = useCustomer()

    const wishlistQuery = useSuspenseQuery<Wishlist>({
        queryKey: ['wishlist'],
        queryFn: async () => {
            const data = await fetchWishlist(customer?.id)
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

export { WishlistProvider, WishlistContext, useWishlist }
