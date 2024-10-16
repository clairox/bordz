import { smallint } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { pgTableWithAutoFields, shortUuid } from './shared'
import { CustomerTable } from './user'
import { ProductTable } from './product'

export const WishlistTable = pgTableWithAutoFields('wishlists', {
    quantity: smallint('quantity').default(0).notNull(),
    ownerId: shortUuid('owner_id').references(() => CustomerTable.id, {
        onDelete: 'cascade',
    }),
})

export const WishlistLineItemTable = pgTableWithAutoFields(
    'wishlist_line_items',
    {
        productId: shortUuid('product_id')
            .references(() => ProductTable.id, {
                onDelete: 'cascade',
            })
            .notNull(),
        wishlistId: shortUuid('wishlist_id')
            .references(() => WishlistTable.id, {
                onDelete: 'cascade',
            })
            .notNull(),
    }
)

export const WishlistRelations = relations(WishlistTable, ({ one, many }) => ({
    owner: one(CustomerTable, {
        fields: [WishlistTable.ownerId],
        references: [CustomerTable.id],
    }),
    lines: many(WishlistLineItemTable),
}))

export const WishlistLineItemRelations = relations(
    WishlistLineItemTable,
    ({ one }) => ({
        product: one(ProductTable, {
            fields: [WishlistLineItemTable.productId],
            references: [ProductTable.id],
        }),
        wishlist: one(WishlistTable, {
            fields: [WishlistLineItemTable.wishlistId],
            references: [WishlistTable.id],
        }),
    })
)
