import { desc, eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { CustomerTable } from '@/drizzle/schema/user'
import { AddressTable } from '@/drizzle/schema/address'
import { CustomerQueryResult } from '@/types/queries'

const getCustomerByUserId = async (
    userId: string
): Promise<CustomerQueryResult | undefined> => {
    return await db.query.CustomerTable.findFirst({
        where: eq(CustomerTable.userId, userId),
        with: {
            defaultAddress: { with: { address: true } },
            addresses: { orderBy: [desc(AddressTable.createdAt)] },
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
