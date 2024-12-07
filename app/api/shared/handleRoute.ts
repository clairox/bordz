import { NextResponse } from 'next/server'

import { handleError } from '@/lib/errors'

const handleRoute = async (
    callback: () => Promise<NextResponse>
): Promise<NextResponse> => {
    try {
        return await callback()
    } catch (error) {
        return handleError(error as Error)
    }
}

export default handleRoute
