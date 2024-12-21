import { NextRequest, NextResponse } from 'next/server'

import { db } from '@/drizzle/db'
import { AddressTable, DefaultAddressTable } from '@/drizzle/schema/address'
import { handleRoute, validateRequestBody } from '../shared'

export const POST = async (request: NextRequest) =>
    await handleRoute(async () => {
        const data = await request.json()
        const requiredFields = [
            'fullName',
            'line1',
            'city',
            'state',
            'countryCode',
            'postalCode',
        ]
        validateRequestBody(data, requiredFields)

        const { ownerId } = data

        const address = await db
            .insert(AddressTable)
            .values({
                fullName: data.fullName,
                line1: data.line1,
                line2: data.line2,
                city: data.city,
                state: data.state,
                postalCode: data.postalCode,
                countryCode: 'US',
                ownerId: ownerId,
            })
            .returning()
            .then(rows => rows[0])

        if (ownerId && data.isCustomerDefault) {
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
    })
