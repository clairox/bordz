import { NextRequest, NextResponse } from 'next/server'

import { db } from '@/drizzle/db'
import { AddressTable, DefaultAddressTable } from '@/drizzle/schema/address'
import { handleError } from '@/lib/errors'

export const POST = async (request: NextRequest) => {
    const {
        fullName,
        line1,
        line2,
        city,
        state,
        postalCode,
        ownerId,
        isCustomerDefault,
    } = await request.json()

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
                ownerId,
            })
            .returning()
            .then(rows => rows[0])

        if (ownerId && isCustomerDefault) {
            await db
                .insert(DefaultAddressTable)
                .values({
                    ownerId,
                    addressId: address.id,
                })
                .onConflictDoUpdate({
                    target: DefaultAddressTable.ownerId,
                    set: { addressId: address.id },
                })
        } else if (ownerId) {
            await db
                .insert(DefaultAddressTable)
                .values({ ownerId, addressId: address.id })
                .onConflictDoNothing()
        }

        return NextResponse.json(address)
    } catch (error) {
        handleError(error)
    }
}
