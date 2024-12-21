import { count, SQL } from 'drizzle-orm'
import { PgTableWithColumns, TableConfig } from 'drizzle-orm/pg-core'

import { db } from '@/drizzle/db'

const calculateNextPageNumber = async <T extends TableConfig>(
    page: number,
    pageSize: number,
    table: PgTableWithColumns<T>,
    where?: SQL
): Promise<number | undefined> => {
    const totalCount = await db
        .select({ count: count() })
        .from(table)
        .where(where)
        .then(rows => rows[0].count)

    const totalPages = Math.ceil(totalCount / pageSize)
    return totalPages > page ? page + 1 : undefined
}

export default calculateNextPageNumber
