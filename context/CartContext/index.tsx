'use client'

import { createContext } from 'react'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { useCustomer } from '../CustomerContext'
import { fetchSessionCart } from '@/lib/api'
import { mapCartResponseToCart } from '@/utils/conversions'

type CartContextValue = UseQueryResult<Cart>

const CartContext = createContext<CartContextValue>({} as CartContextValue)

type CartProviderProps = React.PropsWithChildren<{
    initialData?: Cart
}>
const CartProvider: React.FC<CartProviderProps> = ({
    initialData,
    children,
}) => {
    const { data: customer } = useCustomer()

    const cartQuery = useQuery<Cart>({
        queryKey: ['cart'],
        queryFn: async () => {
            return await fetchSessionCart(customer?.id).then(res =>
                mapCartResponseToCart(res)
            )
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
