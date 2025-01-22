import {
    integer,
    smallint,
    timestamp,
    uniqueIndex,
    varchar,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { pgTableWithAutoFields, shortUuid } from './shared'
import { Customers } from './customer'
import { Orders } from './order'
import { Addresses } from './address'
import { Products } from './product'
import { Carts } from './cart'

export const Checkouts = pgTableWithAutoFields('checkouts', {
    subtotal: integer('subtotal').default(0).notNull(),
    total: integer('total').default(0).notNull(),
    totalShipping: integer('total_shipping').default(0).notNull(),
    totalTax: integer('total_tax').default(0).notNull(),
    email: varchar('email', { length: 320 }),
    completedAt: timestamp('completed_at'),
    paymentIntentId: varchar('payment_intent_id', { length: 200 }),
    cartId: shortUuid('cart_id').references(() => Carts.id, {
        onDelete: 'set null',
    }),
    customerId: shortUuid('customer_id').references(() => Customers.id, {
        onDelete: 'set null',
    }),
    shippingAddressId: shortUuid('shipping_address_id').references(
        () => Addresses.id,
        { onDelete: 'set null' }
    ),
    orderId: shortUuid('order_id').references(() => Orders.id, {
        onDelete: 'cascade',
    }),
})

export const CheckoutLines = pgTableWithAutoFields(
    'checkout_lines',
    {
        unitPrice: integer('total').default(0).notNull(),
        quantity: smallint('quantity').default(1).notNull(),
        productId: shortUuid('product_id').references(() => Products.id, {
            onDelete: 'set null',
        }),
        checkoutId: shortUuid('checkout_id')
            .references(() => Checkouts.id, { onDelete: 'cascade' })
            .notNull(),
    },
    table => [
        uniqueIndex('checkout_id_product_id_idx').on(
            table.checkoutId,
            table.productId
        ),
    ]
    // table => ({
    //     checkoutIdProductIdIdx: uniqueIndex('checkout_id_product_id_idx').on(
    //         table.checkoutId,
    //         table.productId
    //     ),
    // })
)

export const CheckoutRelations = relations(Checkouts, ({ one, many }) => ({
    lines: many(CheckoutLines),
    cart: one(Carts, {
        fields: [Checkouts.cartId],
        references: [Carts.id],
    }),
    customer: one(Customers, {
        fields: [Checkouts.customerId],
        references: [Customers.id],
    }),
    shippingAddress: one(Addresses, {
        fields: [Checkouts.shippingAddressId],
        references: [Addresses.id],
    }),
    order: one(Orders, {
        fields: [Checkouts.orderId],
        references: [Orders.id],
    }),
}))

export const CheckoutLineRelations = relations(CheckoutLines, ({ one }) => ({
    product: one(Products, {
        fields: [CheckoutLines.productId],
        references: [Products.id],
    }),
    checkout: one(Checkouts, {
        fields: [CheckoutLines.checkoutId],
        references: [Checkouts.id],
    }),
}))
