'use client'
import { createContext, useCallback, useContext } from 'react'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import fetchAbsolute from '@/lib/fetchAbsolute'

type CartContextValue = UseQueryResult<Cart, Error>

const CartContext = createContext<CartContextValue>({} as CartContextValue)

const useCartQuery = () => useContext(CartContext)

const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const cartQuery = useQuery({
        queryKey: ['cart'],
        queryFn: useCallback(async (): Promise<Cart> => {
            try {
                const res = await fetchAbsolute(`/cart`)

                if (!res.ok) {
                    throw res
                }

                return await res.json()
            } catch (error) {
                throw error
            }
        }, []),
    })

    return (
        <CartContext.Provider value={cartQuery}>
            {children}
        </CartContext.Provider>
    )
}

export { CartProvider, CartContext, useCartQuery }
