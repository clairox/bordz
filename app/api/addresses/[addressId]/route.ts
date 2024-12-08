import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'

import { handleRoute } from '../../shared'
import { db } from '@/drizzle/db'
import { AddressTable } from '@/drizzle/schema/address'
import { createInternalServerError, createNotFoundError } from '@/lib/errors'

export const GET = async (
    _: NextRequest,
    context: { params: { addressId: string } }
) => {
    const { addressId } = context.params

    return handleRoute(async () => {
        const address = await db.query.AddressTable.findFirst({
            where: eq(AddressTable.id, addressId),
        })

        if (!address) {
            throw createNotFoundError('Address')
        }

        return NextResponse.json(address)
    })
}

export const PATCH = async (
    request: NextRequest,
    context: { params: { addressId: string } }
) => {
    return handleRoute(async () => {
        const { addressId } = context.params

        const { fullName, line1, line2, city, state, postalCode } =
            await request.json()

        // TODO: Update 'formatted' programmatically
        const updatedAddress = await db
            .update(AddressTable)
            .set({
                fullName,
                line1,
                line2,
                city,
                state,
                postalCode,
                formatted: `${line1}, ${line2 ? line2 + ', ' : ''}${city}, ${state} ${postalCode}, US`,
                updatedAt: new Date(),
            })
            .where(eq(AddressTable.id, addressId))
            .returning()
            .then(rows => rows[0])

        if (!updatedAddress) {
            throw createInternalServerError()
        }

        return NextResponse.json(updatedAddress)
    })
}
