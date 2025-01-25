import * as db from 'db'
import { CategoryRecord } from '@/types/database'

export async function getCategories(): Promise<CategoryRecord[]> {
    return await db.getCategories()
}
