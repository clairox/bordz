import { CategoryRecord } from '@/types/database'
import * as db from 'db'

export async function getCategories(): Promise<CategoryRecord[]> {
    return await db.getCategories()
}
