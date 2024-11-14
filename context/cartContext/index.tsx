'use client'

import { createContext, useContext } from 'react'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

import fetchAbsolute from '@/lib/fetchAbsolute'
import { useAuthQuery } from '../authContext'

type CartContextValue = UseQueryResult<Cart, Error>

const CartContext = createContext<CartContextValue>({} as CartContextValue)

const useCartQuery = () => useContext(CartContext)

const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const {
        auth: { data: user, isPending: isAuthLoading },
        customer: { data: customer },
    } = useAuthQuery()

    const cartQuery = useQuery<Cart>({
        queryKey: ['cart'],
        queryFn: async () => {
            try {
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
            } catch (error) {
                throw error
            }
        },
        enabled:
            (!isAuthLoading && !user) || (!isAuthLoading && customer != null),
    })

    return (
        <CartContext.Provider value={cartQuery}>
            {children}
        </CartContext.Provider>
    )
}

export { CartProvider, CartContext, useCartQuery }
