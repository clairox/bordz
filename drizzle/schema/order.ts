import { integer, smallint, uniqueIndex, varchar } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { pgTableWithAutoFields, shortUuid } from './shared'
import { CustomerTable } from './user'
import { AddressTable } from './address'
import { ProductTable } from './product'

export const OrderTable = pgTableWithAutoFields('orders', {
    email: varchar('email', { length: 320 }).notNull(),
    phone: varchar('phone', { length: 16 }),
    subtotal: integer('subtotal').default(0).notNull(),
    total: integer('total').default(0).notNull(),
    totalShipping: integer('total_shipping').default(0).notNull(),
    totalTax: integer('total_tax').default(0).notNull(),
    customerId: shortUuid('customer_id').references(() => CustomerTable.id, {
        onDelete: 'set null',
    }),
    shippingAddressId: shortUuid('shipping_address_id').references(
        () => AddressTable.id,
        { onDelete: 'set null' }
    ),
})

export const OrderLineItemTable = pgTableWithAutoFields(
    'order_line_items',
    {
        title: varchar('title', { length: 100 }).notNull(),
        total: integer('total').default(0).notNull(),
        quantity: smallint('quantity').default(1).notNull(),
        productId: shortUuid('product_id').references(() => ProductTable.id, {
            onDelete: 'set null',
        }),
        orderId: shortUuid('order_id')
            .references(() => OrderTable.id, { onDelete: 'cascade' })
            .notNull(),
    },
    table => ({
        orderIdProductIdIdx: uniqueIndex('order_id_product_id_idx').on(
            table.orderId,
            table.productId
        ),
    })
)

export const OrderRelations = relations(OrderTable, ({ one, many }) => ({
    lines: many(OrderLineItemTable),
    customer: one(CustomerTable, {
        fields: [OrderTable.customerId],
        references: [CustomerTable.id],
    }),
    shippingAddress: one(AddressTable, {
        fields: [OrderTable.shippingAddressId],
        references: [AddressTable.id],
    }),
}))

export const OrderLineItemRelations = relations(
    OrderLineItemTable,
    ({ one }) => ({
        product: one(ProductTable, {
            fields: [OrderLineItemTable.productId],
            references: [ProductTable.id],
        }),
        order: one(OrderTable, {
            fields: [OrderLineItemTable.orderId],
            references: [OrderTable.id],
        }),
    })
)
