import { NextRequest, NextResponse } from 'next/server'

import { db } from '@/drizzle/db'
import { AddressTable } from '@/drizzle/schema/address'
import { handleError } from '@/lib/errors'

export const POST = async (request: NextRequest) => {
    const { fullName, line1, line2, city, state, postalCode } =
        await request.json()

    try {
        const address = await db
            .insert(AddressTable)
            .values({
                fullName,
                line1,
                line2,
                city,
                state,
                postalCode,
                countryCode: 'US',
                formatted: `${line1}, ${line2 ? line2 + ', ' : ''}${city}, ${state} ${postalCode}, US`,
            })
            .returning()
            .then(rows => rows[0])

        return NextResponse.json(address)
    } catch (error) {
        handleError(error)
    }
}
