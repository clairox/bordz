import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { AddressTable } from '@/drizzle/schema/address'
import { handleError } from '@/lib/errors'
import { decodeSessionToken } from '../shared'
import { CustomerTable } from '@/drizzle/schema/user'

export const POST = async (request: NextRequest) => {
    const { fullName, line1, line2, city, state, postalCode } =
        await request.json()

    const session = request.cookies.get('session')?.value

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

        if (session) {
            const { sub } = decodeSessionToken(session)
            await db
                .update(CustomerTable)
                .set({ defaultAddressId: address.id })
                .where(eq(CustomerTable.userId, sub))

            const updatedAddress = await db.query.AddressTable.findFirst({
                where: eq(AddressTable.id, address.id),
            })

            return NextResponse.json(updatedAddress)
        }

        return NextResponse.json(address)
    } catch (error) {
        handleError(error)
    }
}
