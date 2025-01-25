'use server'

import { and, asc, desc, eq, inArray, SQL, sql } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { Addresses, DefaultAddresses } from '@/drizzle/schema/address'
import {
    AddressRecord,
    CreateCustomerRecordArgs,
    CustomerRecord,
    UpdateCustomerRecordArgs,
} from '@/types/database'
import { AddressQueryResult, CustomerQueryResult } from '@/types/queries'
import { toLongUUID } from '../uuidTranslator'
import { SortKey } from '@/types/sorting'
import { Customers } from '@/drizzle/schema/customer'
import { DEFAULT_SORT_KEY } from '@/utils/constants'

export async function getCustomer(
    id: CustomerRecord['id']
): Promise<CustomerQueryResult | undefined> {
    return await db.query.Customers.findFirst({
        where: eq(Customers.id, id),
        with: customerWith,
    }).then(row => (row ? formatCustomerResult(row) : undefined))
}

export async function getCustomerByUserId(
    userId: CustomerRecord['userId']
): Promise<CustomerQueryResult | undefined> {
    return await db.query.Customers.findFirst({
        where: eq(Customers.userId, userId),
        with: customerWith,
    }).then(row => (row ? formatCustomerResult(row) : undefined))
}

export async function createCustomer(
    values: CreateCustomerRecordArgs
): Promise<CustomerQueryResult> {
    const [newCustomer] = await db.insert(Customers).values(values).returning()
    const result = await db.query.Customers.findFirst({
        where: eq(Customers.id, newCustomer.id),
        with: customerWith,
    }).then(row => formatCustomerResult(row!))
    return result
}

export async function updateCustomer(
    id: CustomerRecord['id'],
    values: UpdateCustomerRecordArgs
): Promise<CustomerQueryResult> {
    const [updatedCustomer] = await db
        .update(Customers)
        .set({ ...values, updatedAt: new Date() })
        .where(eq(Customers.id, id))
        .returning()
    const result = await db.query.Customers.findFirst({
        where: eq(Customers.id, updatedCustomer.id),
        with: customerWith,
    }).then(row => formatCustomerResult(row!))
    return result
}

export async function updateCustomerByUserId(
    userId: CustomerRecord['userId'],
    values: UpdateCustomerRecordArgs
): Promise<CustomerQueryResult> {
    const [updatedCustomer] = await db
        .update(Customers)
        .set({ ...values, updatedAt: new Date() })
        .where(eq(Customers.userId, userId))
        .returning()
    const result = await db.query.Customers.findFirst({
        where: eq(Customers.id, updatedCustomer.id),
        with: customerWith,
    }).then(row => formatCustomerResult(row!))
    return result
}

export async function deleteCustomer(
    id: CustomerRecord['id']
): Promise<CustomerRecord['id']> {
    const [{ id: deletedCustomerId }] = await db
        .delete(Customers)
        .where(eq(Customers.id, id))
        .returning({ id: Customers.id })
    return deletedCustomerId!
}

export async function deleteCustomerByUserId(
    userId: CustomerRecord['userId']
): Promise<CustomerRecord['id']> {
    const [{ id: deletedCustomerId }] = await db
        .delete(Customers)
        .where(eq(Customers.userId, userId))
        .returning({ id: Customers.id })
    return deletedCustomerId!
}

export async function deleteCustomers(
    ids: CustomerRecord['id'][]
): Promise<CustomerRecord['id'][]> {
    const deletedCustomers = await db
        .delete(Customers)
        .where(inArray(Customers.id, ids))
        .returning({ id: Customers.id })
    return deletedCustomers.map(customer => customer.id)
}

export async function getCustomers(options?: {
    publicOnly?: boolean
    limit?: number
    offset?: number
    orderBy?: SortKey
}): Promise<{ customers: CustomerQueryResult[]; totalCount: number }> {
    const sorts: Partial<Record<SortKey, SQL>> = {
        'date-desc': desc(Customers.createdAt),
        'date-asc': asc(Customers.createdAt),
        'alpha-desc': desc(Customers.displayName),
        'alpha-asc': asc(Customers.displayName),
    }

    const orderBy = sorts[options?.orderBy ?? DEFAULT_SORT_KEY]

    const customers = await db.query.Customers.findMany({
        limit: options?.limit,
        offset: options?.offset,
        orderBy,
        with: customerWith,
    }).then(rows => {
        if (rows.length > 0) {
            return rows.map(row => {
                return formatCustomerResult(row)
            })
        }
        return []
    })

    const totalCount = await db.$count(Customers)

    return { customers, totalCount }
}

export async function updateCustomerDefaultAddress(
    customerId: CustomerRecord['id'],
    addressId: AddressRecord['id'],
    updateOnConflict: boolean = false
): Promise<AddressQueryResult> {
    if (updateOnConflict) {
        await db
            .insert(DefaultAddresses)
            .values({
                ownerId: customerId,
                addressId,
            })
            .onConflictDoUpdate({
                target: DefaultAddresses.ownerId,
                set: { addressId },
            })
    } else {
        await db
            .insert(DefaultAddresses)
            .values({ ownerId: customerId, addressId })
            .onConflictDoNothing()
    }

    const result = await db.query.DefaultAddresses.findFirst({
        where: eq(DefaultAddresses.ownerId, customerId),
        with: {
            address: true,
        },
    })

    return result!.address!
}

export async function deleteCustomerDefaultAddress(
    customerId: CustomerRecord['id'],
    addressId: AddressRecord['id']
): Promise<AddressRecord['id']> {
    const [{ addressId: deletedAddressId }] = await db
        .delete(DefaultAddresses)
        .where(
            and(
                eq(DefaultAddresses.ownerId, customerId),
                eq(DefaultAddresses.addressId, addressId)
            )
        )
        .returning({ addressId: DefaultAddresses.addressId })
    return deletedAddressId!
}

export async function ensureCustomerDefaultAddressOnDelete(
    customerId: CustomerRecord['id']
): Promise<void> {
    await db.execute(sql`
        INSERT INTO default_addresses (owner_id, address_id)
        SELECT ${toLongUUID(customerId)}, id
        FROM addresses
        WHERE owner_id = ${toLongUUID(customerId)}
        ORDER BY created_at DESC
        LIMIT 1
        ON CONFLICT DO NOTHING;
    `)
}

function formatCustomerResult(result: any): CustomerQueryResult {
    return {
        ...result,
        defaultAddress: result.defaultAddress?.address || null,
    }
}

type True = true
const customerWith = {
    defaultAddress: { with: { address: true as True } },
    addresses: { orderBy: [desc(Addresses.createdAt)] },
}
