'use client'
import { createContext, useCallback, useEffect, useState } from 'react'
import { useAuth } from '@/providers/Auth'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

type CartContextValue = UseQueryResult<Cart, Error>

const CartContext = createContext<CartContextValue>({} as CartContextValue)

const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { user, status: authStatus } = useAuth()
    const [hasInitialized, setHasInitialized] = useState(false)
    const [cartId, setCartId] = useState<string | undefined | null>(null)

    useEffect(() => {
        if (!hasInitialized && authStatus === 'success') {
            setCartId(user?.cartId ?? localStorage.getItem('cartId'))
            setHasInitialized(true)
        }
    }, [hasInitialized, authStatus, user])

    const getCart = useCallback(async (): Promise<Cart> => {
        const createCart = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/carts`, {
                    method: 'POST',
                })

                const newCart: Cart = await res.json()
                localStorage.setItem('cartId', newCart.id)

                return newCart
            } catch (error) {
                throw error
            }
        }

        if (cartId == undefined) {
            return await createCart()
        }

        try {
            const res = await fetch(`http://localhost:3000/api/carts/${cartId}`)

            return await res.json()
        } catch (error) {
            if (error instanceof Response && error.status === 404) {
                return await createCart()
            }

            throw error
        }
    }, [cartId])

    const cartQuery = useQuery({
        queryKey: ['cart'],
        queryFn: getCart,
        enabled: hasInitialized,
    })

    return (
        <CartContext.Provider value={cartQuery}>
            {children}
        </CartContext.Provider>
    )
}

export { CartProvider, CartContext }
