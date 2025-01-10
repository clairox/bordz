'use client'

import { createContext, useContext } from 'react'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { useCustomer } from '../CustomerContext'
import { fetchWishlist } from '@/lib/api'
import { mapWishlistResponseToWishlist } from '@/utils/conversions'

type WishlistContextValue = UseQueryResult<Wishlist, Error>

const WishlistContext = createContext<WishlistContextValue>(
    {} as WishlistContextValue
)

const useWishlist = () => useContext(WishlistContext)

const WishlistProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { data: customer, isPending: isCustomerPending } = useCustomer()

    const wishlistQuery = useQuery<Wishlist>({
        queryKey: ['wishlist', customer?.id],
        queryFn: async () => {
            const data = await fetchWishlist(customer?.id)
            return mapWishlistResponseToWishlist(data)
        },
        enabled: !isCustomerPending,
    })

    return (
        <WishlistContext.Provider value={wishlistQuery}>
            {children}
        </WishlistContext.Provider>
    )
}

export { WishlistProvider, WishlistContext, useWishlist }
