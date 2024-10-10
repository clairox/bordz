import { NextResponse } from 'next/server'

const handleError = (error: Error) => {
    return NextResponse.json({ error }, { status: 500 })
}

export default handleError
