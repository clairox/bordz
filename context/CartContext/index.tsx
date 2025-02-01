'use client'

import { createContext } from 'react'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { fetchSessionCart } from '@/lib/api'
import { mapCartResponseToCart } from '@/utils/conversions'

type CartContextValue = UseQueryResult<Cart>
type CartProviderProps = React.PropsWithChildren

const CartContext = createContext<CartContextValue>({} as CartContextValue)

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const cartQuery = useQuery<Cart>({
        queryKey: ['cart'],
        queryFn: async () => {
            return await fetchSessionCart().then(res =>
                mapCartResponseToCart(res)
            )
        },
    })

    return (
        <CartContext.Provider value={cartQuery}>
            {children}
        </CartContext.Provider>
    )
}

export { CartProvider, CartContext }
