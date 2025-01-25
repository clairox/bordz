'use server'

import { db } from '@/drizzle/db'
import { VendorRecord } from '@/types/database'
import { Vendors } from '@/drizzle/schema/boardComponent'

export async function createVendor(name: string): Promise<VendorRecord> {
    const [newVendor] = await db.insert(Vendors).values({ name }).returning()
    return newVendor
}

export async function getVendors(): Promise<VendorRecord[]> {
    return await db.query.Vendors.findMany()
}
