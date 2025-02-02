import { NextRequest } from 'next/server'

import {
    DEFAULT_PAGE_NUMBER,
    DEFAULT_PAGE_SIZE,
    DEFAULT_SORT_KEY,
} from '@/utils/constants'
import { SortKey } from '@/types/sorting'

export const getRequestOptionsParams = (request: NextRequest) => {
    const searchParams = request.nextUrl.searchParams
    const page = Number(searchParams.get('page')) || DEFAULT_PAGE_NUMBER
    const size = Number(searchParams.get('size')) || DEFAULT_PAGE_SIZE
    const orderBy = (searchParams.get('orderBy') as SortKey) || DEFAULT_SORT_KEY

    return { page, size, orderBy }
}
