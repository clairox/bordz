import { SerializeOptions } from 'cookie'

export const CURRENT_YEAR = new Date().getFullYear()
export const MIN_ALLOWED_CUSTOMER_AGE = 13
export const MIN_YEAR = 1990
export const SHIPPING_COST = 1000
export const CART_ID_COOKIE_MAX_AGE = 60 * 60 * 24 * 14
export const WISHLIST_ID_COOKIE_MAX_AGE = 60 * 60 * 24 * 14
export const MAX_HANDLE_LENGTH = 150

export const DEFAULT_COOKIE_CONFIG: SerializeOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: -1,
    sameSite: 'strict',
    path: '/',
}
