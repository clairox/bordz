export type CartAction = { type: 'SET_CART'; payload: Cart }

export const cartReducer = (cart: Cart, action: CartAction) => {
    switch (action.type) {
        case 'SET_CART':
            localStorage.setItem('cartId', action.payload.id)
            return action.payload
        default:
            return cart
    }
}
