import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { CustomerTable } from '@/drizzle/schema/user'

const getCustomerByUserId = async (userId: string) => {
    return await db.query.CustomerTable.findFirst({
        where: eq(CustomerTable.userId, userId),
    })
}

export default getCustomerByUserId
