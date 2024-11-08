import { SerializeOptions } from 'cookie'

export const CURRENT_YEAR = new Date().getFullYear()
export const MIN_ALLOWED_CUSTOMER_AGE = 13
export const MIN_YEAR = 1990
export const SHIPPING_COST = 1000

export const DEFAULT_COOKIE_CONFIG: SerializeOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: -1,
    sameSite: 'strict',
    path: '/',
}
