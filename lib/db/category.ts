'use server'

import { db } from '@/drizzle/db'
import { CategoryRecord } from '@/types/database'

export async function getCategories(): Promise<CategoryRecord[]> {
    return await db.query.Categories.findMany()
}
