import { integer, smallint, timestamp, varchar } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { pgTableWithAutoFields, shortUuid } from './shared'
import { CustomerTable } from './user'
import { OrderTable } from './order'
import { AddressTable } from './address'
import { ProductTable } from './product'
import { CartTable } from './cart'

export const CheckoutTable = pgTableWithAutoFields('checkouts', {
    subtotal: integer('subtotal').default(0).notNull(),
    total: integer('total').default(0).notNull(),
    totalShipping: integer('total_shipping').default(0).notNull(),
    totalTax: integer('total_tax').default(0).notNull(),
    email: varchar('email', { length: 320 }),
    completedAt: timestamp('completed_at'),
    paymentIntentId: varchar('payment_intent_id', { length: 200 }),
    cartId: shortUuid('cart_id').references(() => CartTable.id, {
        onDelete: 'set null',
    }),
    customerId: shortUuid('customer_id').references(() => CustomerTable.id, {
        onDelete: 'set null',
    }),
    shippingAddressId: shortUuid('shipping_address_id').references(
        () => AddressTable.id,
        { onDelete: 'set null' }
    ),
    orderId: shortUuid('order_id').references(() => OrderTable.id, {
        onDelete: 'cascade',
    }),
})

export const CheckoutLineItemTable = pgTableWithAutoFields(
    'checkout_line_items',
    {
        unitPrice: integer('total').default(0).notNull(),
        quantity: smallint('quantity').default(1).notNull(),
        productId: shortUuid('product_id').references(() => ProductTable.id, {
            onDelete: 'set null',
        }),
        checkoutId: shortUuid('checkout_id')
            .references(() => CheckoutTable.id, { onDelete: 'cascade' })
            .notNull(),
    }
)

export const CheckoutRelations = relations(CheckoutTable, ({ one, many }) => ({
    lines: many(CheckoutLineItemTable),
    cart: one(CartTable, {
        fields: [CheckoutTable.cartId],
        references: [CartTable.id],
    }),
    customer: one(CustomerTable, {
        fields: [CheckoutTable.customerId],
        references: [CustomerTable.id],
    }),
    shippingAddress: one(AddressTable, {
        fields: [CheckoutTable.shippingAddressId],
        references: [AddressTable.id],
    }),
    order: one(OrderTable, {
        fields: [CheckoutTable.orderId],
        references: [OrderTable.id],
    }),
}))

export const CheckoutLineItemRelations = relations(
    CheckoutLineItemTable,
    ({ one }) => ({
        product: one(ProductTable, {
            fields: [CheckoutLineItemTable.productId],
            references: [ProductTable.id],
        }),
        checkout: one(CheckoutTable, {
            fields: [CheckoutLineItemTable.checkoutId],
            references: [CheckoutTable.id],
        }),
    })
)
