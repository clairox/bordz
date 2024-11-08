import { pgEnum, smallint, varchar } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { pgTableWithAutoFields, shortUuid } from './shared'
import { AddressTable } from './address'
import { OrderTable } from './order'
import { CartTable } from './cart'
import { WishlistTable } from './wishlist'

// export const UserRole = pgEnum('user_role', ['ADMIN', 'CUSTOMER'])
//
// export const UserTable = pgTableWithAutoFields('users', {
//     email: varchar('email', { length: 320 }).unique().notNull(),
//     role: UserRole('role').default('CUSTOMER').notNull(),
// })

// TODO: set defaultAddressId as foreign key later

export const CustomerTable = pgTableWithAutoFields('customers', {
    firstName: varchar('first_name', { length: 50 }).notNull(),
    lastName: varchar('last_name', { length: 50 }).notNull(),
    displayName: varchar('display_name', { length: 100 }).notNull(),
    numberOfOrders: smallint('number_of_orders').default(0).notNull(),
    phone: varchar('phone', { length: 16 }),
    userId: shortUuid('user_id').notNull(), // TODO: make unique
    // .references(() => UserTable.id, { onDelete: 'cascade' })
    // .notNull(),
    defaultAddressId: shortUuid('default_address_id'),
})

export const CustomerRelations = relations(CustomerTable, ({ one, many }) => ({
    // user: one(UserTable, {
    //     fields: [CustomerTable.userId],
    //     references: [UserTable.id],
    // }),
    cart: one(CartTable),
    wishlist: one(WishlistTable),
    addresses: many(AddressTable),
    orders: many(OrderTable),
    defaultAddress: one(AddressTable, {
        fields: [CustomerTable.defaultAddressId],
        references: [AddressTable.id],
    }),
}))
