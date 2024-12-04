import { db } from '@/drizzle/db'
import { handleError } from '@/lib/errors'
import { NextResponse } from 'next/server'

export const GET = async () => {
    try {
        const sizes = await db.query.SizeTable.findMany()
        return NextResponse.json(sizes)
    } catch (error) {
        handleError(error as Error)
    }
}
