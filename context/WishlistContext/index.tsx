'use client'

import { createContext, useContext } from 'react'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

import fetchAbsolute from '@/lib/fetchAbsolute'
import { useCustomer } from '../CustomerContext'

type WishlistContextValue = UseQueryResult<Wishlist, Error>

const WishlistContext = createContext<WishlistContextValue>(
    {} as WishlistContextValue
)

const useWishlist = () => useContext(WishlistContext)

const fetchWishlist = async (customerId?: string) => {
    const response = await fetchAbsolute('/wishlist', {
        method: 'POST',
        body: JSON.stringify({ customerId }),
    })
    if (!response.ok) {
        throw response
    }
    return await response.json()
}

const WishlistProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { data: customer, isPending: isCustomerPending } = useCustomer()

    const wishlistQuery = useQuery<Wishlist>({
        queryKey: ['wishlist', customer?.id],
        queryFn: async () => fetchWishlist(customer?.id),
        enabled: !isCustomerPending,
    })

    return (
        <WishlistContext.Provider value={wishlistQuery}>
            {children}
        </WishlistContext.Provider>
    )
}

export { WishlistProvider, WishlistContext, useWishlist }
