import { db } from '@/drizzle/db'
import { handleError } from '@/lib/errors'
import { NextResponse } from 'next/server'

export const GET = async () => {
    try {
        const categories = await db.query.CategoryTable.findMany()
        return NextResponse.json(categories)
    } catch (error) {
        handleError(error as Error)
    }
}
