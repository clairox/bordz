import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { Products } from '@/drizzle/schema/product'

const getProduct = async (id: string) => {
    return await db.query.Products.findFirst({
        where: eq(Products.id, id),
    })
}

export default getProduct
