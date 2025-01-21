import { SerializeOptions } from 'cookie'

export const CURRENT_YEAR = new Date().getFullYear()
export const MIN_ALLOWED_CUSTOMER_AGE = 13
export const MIN_YEAR = 1990
export const SHIPPING_COST = 1000
export const CART_ID_COOKIE_MAX_AGE = 60 * 60 * 24 * 14
export const WISHLIST_ID_COOKIE_MAX_AGE = 60 * 60 * 24 * 14
export const MAX_HANDLE_LENGTH = 150
export const DEFAULT_PAGE_SIZE = 40
export const DEFAULT_PAGE_NUMBER = 1
export const DEFAULT_SORT_KEY = 'date-desc'
export const DEFAULT_ITEM_GRID_COLUMN_COUNT = 4

export const UNEXPECTED_ERROR_TEXT = 'An unexpected error has occurred.'

export const CATEGORIES: Category['label'][] = [
    'Decks',
    'Trucks',
    'Wheels',
    'Bearings',
    'Hardware',
    'Griptape',
]

export const DEFAULT_COOKIE_CONFIG: SerializeOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: -1,
    sameSite: 'strict',
    path: '/',
}
