import { db } from '@/drizzle/db'
import { handleError } from '@/lib/errors'
import { NextResponse } from 'next/server'

export const GET = async () => {
    try {
        const vendors = await db.query.VendorTable.findMany()
        return NextResponse.json(vendors)
    } catch (error) {
        handleError(error as Error)
    }
}
