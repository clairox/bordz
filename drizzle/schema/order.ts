import { integer, smallint, uniqueIndex, varchar } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { pgTableWithAutoFields, shortUuid } from './shared'
import { Customers } from './customer'
import { Addresses } from './address'
import { Products } from './product'

export const Orders = pgTableWithAutoFields('orders', {
    email: varchar('email', { length: 320 }).notNull(),
    phone: varchar('phone', { length: 16 }),
    subtotal: integer('subtotal').default(0).notNull(),
    total: integer('total').default(0).notNull(),
    totalShipping: integer('total_shipping').default(0).notNull(),
    totalTax: integer('total_tax').default(0).notNull(),
    formattedShippingAddress: varchar('formatted_shipping_address', {
        length: 1000,
    }).notNull(),
    customerId: shortUuid('customer_id').references(() => Customers.id, {
        onDelete: 'set null',
    }),
    shippingAddressId: shortUuid('shipping_address_id').references(
        () => Addresses.id,
        { onDelete: 'set null' }
    ),
})

export const OrderLines = pgTableWithAutoFields(
    'order_lines',
    {
        title: varchar('title', { length: 100 }).notNull(),
        total: integer('total').default(0).notNull(),
        quantity: smallint('quantity').default(1).notNull(),
        productId: shortUuid('product_id').references(() => Products.id, {
            onDelete: 'set null',
        }),
        orderId: shortUuid('order_id')
            .references(() => Orders.id, { onDelete: 'cascade' })
            .notNull(),
    },
    table => [
        uniqueIndex('order_id_product_id_idx').on(
            table.orderId,
            table.productId
        ),
    ]
)

export const OrderRelations = relations(Orders, ({ one, many }) => ({
    lines: many(OrderLines),
    customer: one(Customers, {
        fields: [Orders.customerId],
        references: [Customers.id],
    }),
    shippingAddress: one(Addresses, {
        fields: [Orders.shippingAddressId],
        references: [Addresses.id],
    }),
}))

export const OrderLineRelations = relations(OrderLines, ({ one }) => ({
    product: one(Products, {
        fields: [OrderLines.productId],
        references: [Products.id],
    }),
    order: one(Orders, {
        fields: [OrderLines.orderId],
        references: [Orders.id],
    }),
}))
