'use client'

import { createContext } from 'react'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { useCustomer } from '../CustomerContext'
import { fetchCart } from '@/lib/api'
import { mapCartResponseToCart } from '@/utils/conversions'

type CartContextValue = UseQueryResult<Cart, Error>

const CartContext = createContext<CartContextValue>({} as CartContextValue)

const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { data: customer, isPending: isCustomerPending } = useCustomer()

    const cartQuery = useQuery<Cart>({
        queryKey: ['cart', customer?.id],
        queryFn: async () => {
            const data = await fetchCart(customer?.id)
            return mapCartResponseToCart(data)
        },
        enabled: !isCustomerPending,
    })

    return (
        <CartContext.Provider value={cartQuery}>
            {children}
        </CartContext.Provider>
    )
}

export { CartProvider, CartContext }
