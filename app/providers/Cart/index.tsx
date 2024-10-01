'use client'
import { createContext, useContext, useEffect, useReducer } from 'react'
import { cartReducer } from './reducer'
import { useAuth } from '../Auth'

type CartContextValue = {
    cart: Cart
}

const CartContext = createContext<CartContextValue>({} as CartContextValue)

const useCart = () => useContext(CartContext)

const initialCart = {
    buyer: null,
    cost: {
        subtotalAmount: { amount: 0, currencyCode: '' },
        totalAmount: { amount: 0, currencyCode: '' },
    },
    id: '',
    lines: [],
    totalQuantity: 0,
}

const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { user, status: authStatus } = useAuth()
    const [cart, dispatchCart] = useReducer(cartReducer, initialCart)

    useEffect(() => {
        const syncCart = async () => {
            const cartId = localStorage.getItem('cartId')

            if (cartId == undefined) {
                const res = await fetch('/api/carts', {
                    method: 'POST',
                    body:
                        authStatus === 'loggedIn'
                            ? JSON.stringify({ user: user?.id })
                            : null,
                })

                const data = await res.json()
                dispatchCart({ type: 'SET_CART', payload: data })
            } else {
                const res = await fetch(`/api/carts?id=${cartId}`, {
                    method: 'GET',
                })

                const data = await res.json()
                dispatchCart({ type: 'SET_CART', payload: data })
            }
        }

        syncCart()
    }, [user, authStatus])

    return (
        <CartContext.Provider value={{ cart }}>{children}</CartContext.Provider>
    )
}

export { CartProvider, useCart }
