import handleError from '@/lib/errorHandling'
import { db } from '@/drizzle/db'
import { ProductTable } from '@/drizzle/schema/product'
import { NextRequest, NextResponse } from 'next/server'

const defaultLimit = 40
const defaultOffset = 0

export const GET = async (request: NextRequest) => {
    const searchParams = request.nextUrl.searchParams
    const limit = Number(searchParams.get('limit') || defaultLimit)
    const offset = Number(searchParams.get('offset') || defaultOffset)

    try {
        const products = await db
            .select()
            .from(ProductTable)
            .limit(limit)
            .offset(offset)

        return NextResponse.json(products)
    } catch (error) {
        handleError(error)
    }
}
