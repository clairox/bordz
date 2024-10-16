import { SerializeOptions } from 'cookie'

export const SHIPPING_COST = 1000

export const DEFAULT_COOKIE_CONFIG: SerializeOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: -1,
    sameSite: 'strict',
    path: '/',
}
