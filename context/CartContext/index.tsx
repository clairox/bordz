'use client'

import { createContext, useContext } from 'react'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

import fetchAbsolute from '@/lib/fetchAbsolute'
import { useCustomer } from '../CustomerContext'

type CartContextValue = UseQueryResult<Cart, Error>

const CartContext = createContext<CartContextValue>({} as CartContextValue)

const useCartQuery = () => useContext(CartContext)

const fetchCart = async (customerId?: string) => {
    const response = await fetchAbsolute('/cart', {
        method: 'POST',
        body: JSON.stringify({ customerId }),
    })
    if (!response.ok) {
        throw response
    }
    return await response.json()
}

const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { data: customer, isPending: isCustomerPending } = useCustomer()

    const cartQuery = useQuery<Cart>({
        queryKey: ['cart', customer?.id],
        queryFn: async () => fetchCart(customer?.id),
        enabled: !isCustomerPending,
    })

    return (
        <CartContext.Provider value={cartQuery}>
            {children}
        </CartContext.Provider>
    )
}

export { CartProvider, CartContext, useCartQuery }
