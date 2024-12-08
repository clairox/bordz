import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { AddressTable } from '@/drizzle/schema/address'
import { handleError } from '@/lib/errors'
import { decodeSessionToken } from '../shared'
import { CustomerTable } from '@/drizzle/schema/user'
import { formatAddress } from '@/utils/helpers'

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
                formatted: formatAddress({
                    line1,
                    line2,
                    city,
                    state,
                    postalCode,
                    countryCode: 'US',
                }),
            })
            .returning()
            .then(rows => rows[0])

        if (session) {
            const { sub } = decodeSessionToken(session)
            const customer = await db
                .update(CustomerTable)
                .set({ defaultAddressId: address.id })
                .where(eq(CustomerTable.userId, sub))
                .returning()
                .then(rows => rows[0])

            const updatedAddress = await db
                .update(AddressTable)
                .set({ ownerId: customer.id })
                .where(eq(AddressTable.id, address.id))
                .returning()
                .then(rows => rows[0])

            return NextResponse.json(updatedAddress)
        }

        return NextResponse.json(address)
    } catch (error) {
        handleError(error)
    }
}
