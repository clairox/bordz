import { pgTable, uniqueIndex, varchar } from 'drizzle-orm/pg-core'
import { isNotNull, relations, SQL, sql } from 'drizzle-orm'

import { pgTableWithAutoFields, shortUuid } from './shared'
import { Customers } from './customer'

export const Addresses = pgTableWithAutoFields(
    'addresses',
    {
        fullName: varchar('full_name', { length: 100 }).notNull(),
        line1: varchar('line_1', { length: 255 }).notNull(),
        line2: varchar('line_2', { length: 255 }),
        city: varchar('city', { length: 100 }).notNull(),
        state: varchar('state', { length: 50 }).notNull(),
        countryCode: varchar('country_code', { length: 3 }).notNull(),
        postalCode: varchar('postal_code', { length: 12 }).notNull(),
        phone: varchar('phone', { length: 16 }),
        formatted: varchar('formatted', { length: 1000 })
            .notNull()
            .generatedAlwaysAs(
                (): SQL =>
                    sql`line_1 || ', ' || 
                        COALESCE(line_2 || ', ', '') || 
                        city || ', ' || 
                        state || ' ' || 
                        postal_code || ', ' || 
                        country_code
                    `
            ),
        ownerId: shortUuid('owner_id').references(() => Customers.id, {
            onDelete: 'set null',
        }),
    },
    table => ({
        ownerIdFullNameAddressIdx: uniqueIndex('owner_id_full_name_address_idx')
            .on(table.ownerId, table.fullName, table.formatted)
            .where(isNotNull(table.ownerId)),
    })
)

export const AddressRelations = relations(Addresses, ({ one }) => ({
    owner: one(Customers, {
        fields: [Addresses.ownerId],
        references: [Customers.id],
    }),
}))

export const DefaultAddresses = pgTable('default_addresses', {
    ownerId: shortUuid('owner_id')
        .primaryKey()
        .references(() => Customers.id, {
            onDelete: 'cascade',
        }),
    addressId: shortUuid('address_id').references(() => Addresses.id, {
        onDelete: 'cascade',
    }),
})

export const DefaultAddressRelations = relations(
    DefaultAddresses,
    ({ one }) => ({
        owner: one(Customers, {
            fields: [DefaultAddresses.ownerId],
            references: [Customers.id],
        }),
        address: one(Addresses, {
            fields: [DefaultAddresses.addressId],
            references: [Addresses.id],
        }),
    })
)
