import { varchar } from 'drizzle-orm/pg-core'
import { pgTableWithAutoFields, shortUuid } from './shared'
import { CustomerTable } from './user'
import { relations } from 'drizzle-orm'

export const AddressTable = pgTableWithAutoFields('addresses', {
    firstName: varchar('first_name', { length: 50 }).notNull(),
    lastName: varchar('last_name', { length: 50 }).notNull(),
    name: varchar('name', { length: 100 }).notNull(),
    address1: varchar('address_1', { length: 255 }).notNull(),
    address2: varchar('address_2', { length: 255 }),
    city: varchar('city', { length: 100 }).notNull(),
    province: varchar('province', { length: 50 }).notNull(),
    provinceCode: varchar('province_code', { length: 3 }).notNull(),
    country: varchar('country', { length: 100 }).notNull(),
    countryCode: varchar('country_code', { length: 3 }).notNull(),
    zip: varchar('zip', { length: 12 }).notNull(),
    phone: varchar('phone', { length: 16 }).notNull(),
    formatted: varchar('formatted', { length: 1000 }).notNull(),
    ownerId: shortUuid('owner_id')
        .references(() => CustomerTable.id, {
            onDelete: 'cascade',
        })
        .notNull(),
})

export const AddressRelations = relations(AddressTable, ({ one }) => ({
    owner: one(CustomerTable, {
        fields: [AddressTable.ownerId],
        references: [CustomerTable.id],
    }),
}))
