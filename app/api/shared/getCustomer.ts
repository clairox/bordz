import { desc, eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { CustomerTable } from '@/drizzle/schema/user'
import { AddressTable } from '@/drizzle/schema/address'

const getCustomerByUserId = async (userId: string) => {
    return await db.query.CustomerTable.findFirst({
        where: eq(CustomerTable.userId, userId),
        with: {
            defaultAddress: { with: { address: true } },
            addresses: { orderBy: [desc(AddressTable.createdAt)] },
        },
    })
}

export default getCustomerByUserId
