import { NextRequest, NextResponse } from 'next/server'
import { eq, sql } from 'drizzle-orm'

import { handleRoute } from '../../shared'
import { db } from '@/drizzle/db'
import { AddressTable, DefaultAddressTable } from '@/drizzle/schema/address'
import { createNotFoundError } from '@/lib/errors'
import { toLongUUID } from '@/lib/uuidTranslator'
import { DynamicRoutePropsWithParams } from '@/types/api'

type Props = DynamicRoutePropsWithParams<{ addressId: string }>

export const GET = async (_: NextRequest, { params: { addressId } }: Props) =>
    await handleRoute(async () => {
        const address = await db.query.AddressTable.findFirst({
            where: eq(AddressTable.id, addressId),
        })
        if (!address) {
            throw createNotFoundError('Address')
        }
        return NextResponse.json(address)
    })

export const PATCH = async (
    request: NextRequest,
    { params: { addressId } }: Props
) =>
    await handleRoute(async () => {
        const data = await request.json()

        const updatedAddress = await db
            .update(AddressTable)
            .set({
                fullName: data.fullName,
                line1: data.line1,
                line2: data.line2,
                city: data.city,
                state: data.state,
                postalCode: data.postalCode,
                updatedAt: new Date(),
            })
            .where(eq(AddressTable.id, addressId))
            .returning()
            .then(rows => rows[0])

        if (updatedAddress.ownerId && data.isCustomerDefault) {
            await db
                .insert(DefaultAddressTable)
                .values({
                    ownerId: updatedAddress.ownerId,
                    addressId: updatedAddress.id,
                })
                .onConflictDoUpdate({
                    target: DefaultAddressTable.ownerId,
                    set: { addressId: updatedAddress.id },
                })
                .returning()
                .then(rows => rows[0])
        }

        return NextResponse.json(updatedAddress)
    })

export const DELETE = async (
    _: NextRequest,
    { params: { addressId } }: Props
) =>
    await handleRoute(async () => {
        const deletedAddress = await db
            .delete(AddressTable)
            .where(eq(AddressTable.id, addressId))
            .returning()
            .then(rows => rows[0])

        if (deletedAddress.ownerId) {
            // Attempt to set a new default address, in case deletedAddress was previous default
            await db.execute(sql`
                INSERT INTO default_addresses (owner_id, address_id)
                SELECT ${toLongUUID(deletedAddress.ownerId)}, id
                FROM addresses
                WHERE owner_id = ${toLongUUID(deletedAddress.ownerId)}
                ORDER BY created_at DESC
                LIMIT 1
                ON CONFLICT DO NOTHING;
            `)
        }

        return new NextResponse(null, { status: 204 })
    })
