'use client'

import { createContext } from 'react'
import { useSuspenseQuery, UseSuspenseQueryResult } from '@tanstack/react-query'

import { useCustomer } from '../CustomerContext'
import { fetchCart } from '@/lib/api'
import { mapCartResponseToCart } from '@/utils/conversions'

type CartContextValue = UseSuspenseQueryResult<Cart>

const CartContext = createContext<CartContextValue>({} as CartContextValue)

type CartProviderProps = React.PropsWithChildren<{
    initialData?: Cart
}>
const CartProvider: React.FC<CartProviderProps> = ({
    initialData,
    children,
}) => {
    const { data: customer } = useCustomer()

    const cartQuery = useSuspenseQuery<Cart>({
        queryKey: ['cart'],
        queryFn: async () => {
            const data = await fetchCart(customer?.id)
            return mapCartResponseToCart(data)
        },
        initialData,
    })

    return (
        <CartContext.Provider value={cartQuery}>
            {children}
        </CartContext.Provider>
    )
}

export { CartProvider, CartContext }
