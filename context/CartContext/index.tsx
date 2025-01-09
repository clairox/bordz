'use client'

import { createContext, useContext } from 'react'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { useCustomer } from '../CustomerContext'
import { fetchCart } from '@/lib/api'

type CartContextValue = UseQueryResult<Cart, Error>

const CartContext = createContext<CartContextValue>({} as CartContextValue)

const useCartQuery = () => useContext(CartContext)

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
