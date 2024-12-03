import { db } from '@/drizzle/db'
import { handleError } from '@/lib/errors'
import { NextResponse } from 'next/server'

export const GET = async () => {
    try {
        const colors = await db.query.ColorTable.findMany()
        return NextResponse.json(colors)
    } catch (error) {
        handleError(error as Error)
    }
}
