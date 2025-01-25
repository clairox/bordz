'use server'

import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { Addresses } from '@/drizzle/schema/address'
import {
    AddressRecord,
    CreateAddressRecordArgs,
    UpdateAddressRecordArgs,
} from '@/types/database'
import { AddressQueryResult } from '@/types/queries'

export async function getAddress(
    id: AddressRecord['id']
): Promise<AddressQueryResult | undefined> {
    return await db.query.Addresses.findFirst({
        where: eq(Addresses.id, id),
    })
}

export async function createAddress(
    values: CreateAddressRecordArgs
): Promise<AddressQueryResult> {
    const [newAddress] = await db.insert(Addresses).values(values).returning()
    return newAddress
}

export async function updateAddress(
    id: AddressRecord['id'],
    values: UpdateAddressRecordArgs
): Promise<AddressQueryResult> {
    const [updatedAddress] = await db
        .update(Addresses)
        .set({ ...values, updatedAt: new Date() })
        .where(eq(Addresses.id, id))
        .returning()
    return updatedAddress
}

export async function deleteAddress(
    id: AddressRecord['id']
): Promise<AddressRecord> {
    const [deletedAddress] = await db
        .delete(Addresses)
        .where(eq(Addresses.id, id))
        .returning()
    return deletedAddress
}

export async function getAddresses(): Promise<AddressQueryResult[]> {
    return await db.query.Addresses.findMany()
}

export async function getAddressesByOwnerId(
    ownerId: string
): Promise<AddressQueryResult[]> {
    return await db.query.Addresses.findMany({
        where: eq(Addresses.ownerId, ownerId!),
    })
}
