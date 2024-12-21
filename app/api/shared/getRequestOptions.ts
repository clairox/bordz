import { NextRequest } from 'next/server'

import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '@/utils/constants'

const getRequestOptionsParams = (request: NextRequest) => {
    const searchParams = request.nextUrl.searchParams
    const page = Number(searchParams.get('page')) || DEFAULT_PAGE_NUMBER
    const size = Number(searchParams.get('size')) || DEFAULT_PAGE_SIZE

    return { page, size }
}

export default getRequestOptionsParams
