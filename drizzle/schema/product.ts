import { boolean, integer, pgEnum, varchar } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { pgTableWithAutoFields } from './shared'
import { BoardSetupTable } from './boardSetup'

export const ProductType = pgEnum('product_type', ['BOARD', 'OTHER'])

export const ProductTable = pgTableWithAutoFields('products', {
    title: varchar('title', { length: 100 }).notNull(),
    featuredImage: varchar('featured_image', { length: 200 }),
    price: integer('price').default(0).notNull(),
    availableForSale: boolean('available_for_sale').default(false).notNull(),
    productType: ProductType('product_type').default('BOARD').notNull(),
    isPublic: boolean('is_public').default(false).notNull(),
})

export const ProductRelations = relations(ProductTable, ({ one }) => ({
    boardSetup: one(BoardSetupTable),
}))
