import { varchar } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { pgTableWithAutoFields, shortUuid } from './shared'
import { CustomerTable } from './user'

export const AddressTable = pgTableWithAutoFields('addresses', {
    fullName: varchar('full_name', { length: 100 }).notNull(),
    line1: varchar('line_1', { length: 255 }).notNull(),
    line2: varchar('line_2', { length: 255 }),
    city: varchar('city', { length: 100 }).notNull(),
    state: varchar('state', { length: 50 }).notNull(),
    countryCode: varchar('country_code', { length: 3 }).notNull(),
    postalCode: varchar('postal_code', { length: 12 }).notNull(),
    phone: varchar('phone', { length: 16 }),
    formatted: varchar('formatted', { length: 1000 }).notNull(),
    ownerId: shortUuid('owner_id').references(() => CustomerTable.id, {
        onDelete: 'set null',
    }),
})

export const AddressRelations = relations(AddressTable, ({ one }) => ({
    owner: one(CustomerTable, {
        fields: [AddressTable.ownerId],
        references: [CustomerTable.id],
    }),
}))
