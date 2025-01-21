import { desc, eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { Customers } from '@/drizzle/schema/customer'
import { Addresses } from '@/drizzle/schema/address'
import { CustomerQueryResult } from '@/types/queries'

const getCustomerByUserId = async (
    userId: string
): Promise<CustomerQueryResult | undefined> => {
    return await db.query.Customers.findFirst({
        where: eq(Customers.userId, userId),
        with: {
            defaultAddress: { with: { address: true } },
            addresses: { orderBy: [desc(Addresses.createdAt)] },
        },
    }).then(row => {
        if (row) {
            return {
                ...row,
                defaultAddress: row.defaultAddress?.address || null,
            }
        }
    })
}

export default getCustomerByUserId
