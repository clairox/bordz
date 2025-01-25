import * as db from 'db'
import { VendorRecord } from '@/types/database'

export async function createVendor(name: string): Promise<VendorRecord> {
    return await db.createVendor(name)
}

export async function getVendors(): Promise<VendorRecord[]> {
    return await db.getVendors()
}
