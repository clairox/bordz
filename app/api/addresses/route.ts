import { NextRequest, NextResponse } from 'next/server'

import { db } from '@/drizzle/db'
import { Addresses, DefaultAddresses } from '@/drizzle/schema/address'
import { handleRoute, validateRequestBody } from '../shared'
import { eq } from 'drizzle-orm'

export const GET = async (request: NextRequest) =>
    await handleRoute(async () => {
        const ownerId = request.nextUrl.searchParams.get('ownerId')

        const addresses = await db.query.Addresses.findMany({
            where: ownerId ? eq(Addresses.ownerId, ownerId) : undefined,
        })

        return NextResponse.json(addresses)
    })

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
            .insert(Addresses)
            .values({
                fullName: data.fullName,
                line1: data.line1,
                line2: data.line2 || null,
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
                .insert(DefaultAddresses)
                .values({
                    ownerId,
                    addressId: address.id,
                })
                .onConflictDoUpdate({
                    target: DefaultAddresses.ownerId,
                    set: { addressId: address.id },
                })
        } else if (ownerId) {
            await db
                .insert(DefaultAddresses)
                .values({ ownerId, addressId: address.id })
                .onConflictDoNothing()
        }

        return NextResponse.json(address)
    })
