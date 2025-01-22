import { integer, smallint, uniqueIndex } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { pgTableWithAutoFields, shortUuid } from './shared'
import { Customers } from './customer'
import { Products } from './product'
import { Checkouts } from './checkout'

export const Carts = pgTableWithAutoFields('carts', {
    subtotal: integer('subtotal').default(0).notNull(),
    total: integer('total').default(0).notNull(),
    totalQuantity: smallint('total_quantity').default(0).notNull(),
    ownerId: shortUuid('owner_id').references(() => Customers.id, {
        onDelete: 'cascade',
    }),
})

export const CartLines = pgTableWithAutoFields(
    'cart_lines',
    {
        subtotal: integer('subtotal').default(0).notNull(),
        total: integer('total').default(0).notNull(),
        quantity: smallint('quantity').default(1).notNull(),
        productId: shortUuid('product_id')
            .references(() => Products.id, { onDelete: 'cascade' })
            .notNull(),
        cartId: shortUuid('cart_id')
            .references(() => Carts.id, { onDelete: 'cascade' })
            .notNull(),
    },
    table => [
        uniqueIndex('cart_id_product_id_idx').on(table.cartId, table.productId),
    ]
    // table => ({
    //     cartIdProductIdIdx: uniqueIndex('cart_id_product_id_idx').on(
    //         table.cartId,
    //         table.productId
    //     ),
    // })
)

export const CartRelations = relations(Carts, ({ one, many }) => ({
    owner: one(Customers, {
        fields: [Carts.ownerId],
        references: [Customers.id],
    }),
    checkout: one(Checkouts),
    lines: many(CartLines),
}))

export const CartLineRelations = relations(CartLines, ({ one }) => ({
    product: one(Products, {
        fields: [CartLines.productId],
        references: [Products.id],
    }),
    cart: one(Carts, {
        fields: [CartLines.cartId],
        references: [Carts.id],
    }),
}))
