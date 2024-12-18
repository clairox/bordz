'use client'

import { createContext, useContext, useMemo } from 'react'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

import fetchAbsolute from '@/lib/fetchAbsolute'
import { useCustomer } from '../CustomerContext'

type CartContextValue = UseQueryResult<Cart, Error>

const CartContext = createContext<CartContextValue>({} as CartContextValue)

const useCartQuery = () => useContext(CartContext)

const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { data: customer, isPending: isCustomerPending } = useCustomer()
    const queryKey = ['cart', customer?.id]

    const cartQuery = useQuery<Cart>({
        queryKey,
        queryFn: async () => {
            const res = await fetchAbsolute('/cart', {
                method: 'POST',
                body: JSON.stringify({
                    customerId: customer?.id || undefined,
                }),
            })
            if (!res.ok) {
                throw res
            }
            return await res.json()
        },
        enabled: !isCustomerPending,
    })

    return (
        <CartContext.Provider value={cartQuery}>
            {children}
        </CartContext.Provider>
    )
}

export { CartProvider, CartContext, useCartQuery }
