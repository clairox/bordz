import { smallint, uniqueIndex } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { pgTableWithAutoFields, shortUuid } from './shared'
import { Customers } from './customer'
import { Products } from './product'

export const Wishlists = pgTableWithAutoFields('wishlists', {
    quantity: smallint('quantity').default(0).notNull(),
    ownerId: shortUuid('owner_id').references(() => Customers.id, {
        onDelete: 'cascade',
    }),
})

export const WishlistItems = pgTableWithAutoFields(
    'wishlist_items',
    {
        productId: shortUuid('product_id')
            .references(() => Products.id, {
                onDelete: 'cascade',
            })
            .notNull(),
        wishlistId: shortUuid('wishlist_id')
            .references(() => Wishlists.id, {
                onDelete: 'cascade',
            })
            .notNull(),
    },
    table => [
        uniqueIndex('wishlist_id_product_id_idx').on(
            table.wishlistId,
            table.productId
        ),
    ]
)

export const WishlistRelations = relations(Wishlists, ({ one, many }) => ({
    owner: one(Customers, {
        fields: [Wishlists.ownerId],
        references: [Customers.id],
    }),
    items: many(WishlistItems),
}))

export const WishlistItemRelations = relations(WishlistItems, ({ one }) => ({
    product: one(Products, {
        fields: [WishlistItems.productId],
        references: [Products.id],
    }),
    wishlist: one(Wishlists, {
        fields: [WishlistItems.wishlistId],
        references: [Wishlists.id],
    }),
}))
