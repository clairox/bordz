import { boolean, integer, pgEnum, varchar } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { pgTableWithAutoFields } from './shared'
import { Boards } from './board'

export const ProductType = pgEnum('product_type', ['BOARD', 'OTHER'])

// TODO: Add quantity
// TODO: Add compare_at_price
export const Products = pgTableWithAutoFields('products', {
    title: varchar('title', { length: 100 }).notNull(),
    featuredImage: varchar('featured_image', { length: 200 }),
    price: integer('price').default(0).notNull(),
    availableForSale: boolean('available_for_sale').default(false).notNull(),
    productType: ProductType('product_type').default('BOARD').notNull(),
    isPublic: boolean('is_public').default(false).notNull(),
})

export const ProductRelations = relations(Products, ({ one }) => ({
    board: one(Boards),
}))
