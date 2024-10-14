import { integer, smallint } from 'drizzle-orm/pg-core'
import { pgTableWithAutoFields, shortUuid } from './shared'
import { CustomerTable } from './user'
import { ProductTable } from './product'
import { relations } from 'drizzle-orm'
import { CheckoutTable } from './checkout'

export const CartTable = pgTableWithAutoFields('carts', {
    subtotal: integer('subtotal').default(0).notNull(),
    total: integer('total').default(0).notNull(),
    totalQuantity: smallint('total_quantity').default(0).notNull(),
    ownerId: shortUuid('owner_id').references(() => CustomerTable.id, {
        onDelete: 'cascade',
    }),
})

export const CartLineItemTable = pgTableWithAutoFields('cart_line_items', {
    subtotal: integer('subtotal').default(0).notNull(),
    total: integer('total').default(0).notNull(),
    quantity: smallint('quantity').default(1).notNull(),
    productId: shortUuid('product_id')
        .references(() => ProductTable.id, { onDelete: 'cascade' })
        .notNull(),
    cartId: shortUuid('cart_id')
        .references(() => CartTable.id, { onDelete: 'cascade' })
        .notNull(),
})

export const CartRelations = relations(CartTable, ({ one, many }) => ({
    owner: one(CustomerTable, {
        fields: [CartTable.ownerId],
        references: [CustomerTable.id],
    }),
    checkout: one(CheckoutTable),
    lines: many(CartLineItemTable),
}))

export const CartLineItemRelations = relations(
    CartLineItemTable,
    ({ one }) => ({
        product: one(ProductTable, {
            fields: [CartLineItemTable.productId],
            references: [ProductTable.id],
        }),
        cart: one(CartTable, {
            fields: [CartLineItemTable.cartId],
            references: [CartTable.id],
        }),
    })
)
