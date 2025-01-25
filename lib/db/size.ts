'use server'

import { db } from '@/drizzle/db'
import { SizeRecord } from '@/types/database'
import { Sizes } from '@/drizzle/schema/boardComponent'

export async function createSize(label: string): Promise<SizeRecord> {
    const [newSize] = await db.insert(Sizes).values({ label }).returning()
    return newSize
}

export async function getSizes(): Promise<SizeRecord[]> {
    return await db.query.Sizes.findMany()
}
