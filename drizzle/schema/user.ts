import { smallint, varchar } from 'drizzle-orm/pg-core'
import { relations, sql, SQL } from 'drizzle-orm'

import { pgTableWithAutoFields, shortUuid } from './shared'
import { AddressTable, DefaultAddressTable } from './address'
import { OrderTable } from './order'
import { CartTable } from './cart'
import { WishlistTable } from './wishlist'

export const CustomerTable = pgTableWithAutoFields('customers', {
    email: varchar('email', { length: 320 }).unique().notNull(),
    firstName: varchar('first_name', { length: 50 }).notNull(),
    lastName: varchar('last_name', { length: 50 }).notNull(),
    displayName: varchar('display_name', { length: 100 })
        .notNull()
        .generatedAlwaysAs((): SQL => sql`first_name || ' ' || last_name`),
    numberOfOrders: smallint('number_of_orders').default(0).notNull(),
    phone: varchar('phone', { length: 16 }),
    userId: shortUuid('user_id').unique().notNull(),
})

export const CustomerRelations = relations(CustomerTable, ({ one, many }) => ({
    cart: one(CartTable),
    wishlist: one(WishlistTable),
    defaultAddress: one(DefaultAddressTable),
    addresses: many(AddressTable),
    orders: many(OrderTable),
}))
