'use server'

import { db } from '@/drizzle/db'
import { ColorRecord } from '@/types/database'
import { Colors } from '@/drizzle/schema/boardComponent'

export async function createColor(
    label: string,
    value: string
): Promise<ColorRecord> {
    const [newColor] = await db
        .insert(Colors)
        .values({ label, value })
        .returning()
    return newColor
}

export async function getColors(): Promise<ColorRecord[]> {
    return await db.query.Colors.findMany()
}
