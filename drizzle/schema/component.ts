import {
    boolean,
    integer,
    pgTable,
    smallint,
    text,
    varchar,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { generatePK, pgTableWithAutoFields, shortUuid } from './shared'
import { Boards } from './board'
import { MAX_HANDLE_LENGTH } from '@/utils/constants'

export const BoardComponents = pgTableWithAutoFields('board_components', {
    title: varchar('title', { length: 200 }).notNull(),
    handle: varchar('handle', { length: MAX_HANDLE_LENGTH }).notNull(),
    images: varchar('images', { length: 200 }).array(),
    model: varchar('model', { length: 300 }),
    compareAtPrice: integer('compare_at_price'),
    price: integer('price').default(0).notNull(),
    description: text('description'),
    specifications: text('specifications').array(),
    availableForSale: boolean('available_for_sale').default(false).notNull(),
    totalInventory: smallint('total_inventory').default(0).notNull(),
})

export const BoardComponentAttrs = pgTableWithAutoFields(
    'board_component_attrs',
    {
        componentId: shortUuid('component_id')
            .references(() => BoardComponents.id, { onDelete: 'cascade' })
            .notNull(),
        categoryId: shortUuid('category_id')
            .references(() => Categories.id, { onDelete: 'restrict' })
            .notNull(),
        vendorId: shortUuid('vendor_id').references(() => Vendors.id, {
            onDelete: 'set null',
        }),
        sizeId: shortUuid('size_id')
            .references(() => Sizes.id, { onDelete: 'restrict' })
            .notNull(),
        colorId: shortUuid('color_id')
            .references(() => Colors.id, { onDelete: 'restrict' })
            .notNull(),
    }
)

export const Categories = pgTable('categories', {
    id: generatePK(),
    label: varchar('label', { length: 20 }).notNull(),
})

export const Vendors = pgTable('vendors', {
    id: generatePK(),
    name: varchar('name', { length: 50 }).notNull(),
})

export const Sizes = pgTable('sizes', {
    id: generatePK(),
    label: varchar('label', { length: 10 }).notNull(),
})

export const Colors = pgTable('colors', {
    id: generatePK(),
    label: varchar('label', { length: 25 }).notNull(),
    value: varchar('value', { length: 7 }).notNull(),
})

export const BoardComponentRelations = relations(
    BoardComponents,
    ({ one, many }) => ({
        boardSetups: many(Boards), // TODO: boards
        componentAttributes: one(BoardComponentAttrs), // TODO: attrs
    })
)

export const BoardComponentAttrsRelations = relations(
    BoardComponentAttrs,
    ({ one }) => ({
        component: one(BoardComponents, {
            fields: [BoardComponentAttrs.componentId],
            references: [BoardComponents.id],
        }),
        category: one(Categories, {
            fields: [BoardComponentAttrs.categoryId],
            references: [Categories.id],
        }),
        vendor: one(Vendors, {
            fields: [BoardComponentAttrs.vendorId],
            references: [Vendors.id],
        }),
        size: one(Sizes, {
            fields: [BoardComponentAttrs.sizeId],
            references: [Sizes.id],
        }),
        color: one(Colors, {
            fields: [BoardComponentAttrs.colorId],
            references: [Colors.id],
        }),
    })
)

export const CategoryRelations = relations(Categories, ({ many }) => ({
    parent: many(BoardComponentAttrs),
}))

export const VendorRelations = relations(Vendors, ({ many }) => ({
    parent: many(BoardComponentAttrs),
}))

export const SizeRelations = relations(Sizes, ({ many }) => ({
    parent: many(BoardComponentAttrs),
}))

export const ColorRelations = relations(Colors, ({ many }) => ({
    parent: many(BoardComponentAttrs),
}))
