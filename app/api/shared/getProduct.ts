import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { ProductTable } from '@/drizzle/schema/product'
import { boardSetup } from './'

const getProduct = async (id: string) => {
    return await db.query.ProductTable.findFirst({
        where: eq(ProductTable.id, id),
        with: {
            boardSetup,
        },
    })
}

export default getProduct
