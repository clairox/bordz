import { NextResponse } from 'next/server'

import APIError from '@/lib/APIError'

const handleError = (error: unknown) => {
    console.log(error)
    if (error instanceof APIError) {
        return NextResponse.json(error, { status: error.status })
    } else if (error instanceof Error) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }

    return NextResponse.json(
        { message: 'Something went wrong' },
        { status: 500 }
    )
}

export default handleError
