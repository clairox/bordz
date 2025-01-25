import * as db from 'db'
import { ColorRecord } from '@/types/database'

export async function createColor(
    label: string,
    value: string
): Promise<ColorRecord> {
    return await db.createColor(label, value)
}

export async function getColors(): Promise<ColorRecord[]> {
    return await db.getColors()
}
