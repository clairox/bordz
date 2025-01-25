import * as db from 'db'
import { SizeRecord } from '@/types/database'

export async function createSize(label: string): Promise<SizeRecord> {
    return await db.createSize(label)
}

export async function getSizes(): Promise<SizeRecord[]> {
    return await db.getSizes()
}
