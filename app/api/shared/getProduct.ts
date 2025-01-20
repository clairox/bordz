import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { ProductTable } from '@/drizzle/schema/product'

const getProduct = async (id: string) => {
    return await db.query.ProductTable.findFirst({
        where: eq(ProductTable.id, id),
    })
}

export default getProduct
