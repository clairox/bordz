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
import { BoardSetupTable } from './boardSetup'
import { MAX_HANDLE_LENGTH } from '@/utils/constants'

export const ComponentTable = pgTableWithAutoFields('components', {
    title: varchar('title', { length: 100 }).notNull(),
    handle: varchar('handle', { length: MAX_HANDLE_LENGTH }).notNull(),
    image: varchar('image', { length: 100 }),
    model: varchar('model', { length: 300 }),
    compareAtPrice: integer('compare_at_price'),
    price: integer('price').default(0).notNull(),
    description: text('description'),
    specifications: text('specifications').array(),
    availableForSale: boolean('available_for_sale').default(false).notNull(),
    totalInventory: smallint('total_inventory').default(0).notNull(),
})

export const ComponentAttributesTable = pgTableWithAutoFields(
    'component_attributes',
    {
        componentId: shortUuid('component_id')
            .references(() => ComponentTable.id, { onDelete: 'cascade' })
            .notNull(),
        categoryId: shortUuid('category_id')
            .references(() => CategoryTable.id, { onDelete: 'restrict' })
            .notNull(),
        vendorId: shortUuid('vendor_id').references(() => VendorTable.id, {
            onDelete: 'set null',
        }),
        sizeId: shortUuid('size_id')
            .references(() => SizeTable.id, { onDelete: 'restrict' })
            .notNull(),
        colorId: shortUuid('color_id')
            .references(() => ColorTable.id, { onDelete: 'restrict' })
            .notNull(),
    }
)

export const CategoryTable = pgTable('categories', {
    id: generatePK(),
    label: varchar('label', { length: 20 }).notNull(),
})

export const VendorTable = pgTable('vendors', {
    id: generatePK(),
    name: varchar('name', { length: 50 }).notNull(),
})

export const SizeTable = pgTable('sizes', {
    id: generatePK(),
    label: varchar('label', { length: 10 }).notNull(),
})

export const ColorTable = pgTable('colors', {
    id: generatePK(),
    label: varchar('label', { length: 25 }).notNull(),
    value: varchar('value', { length: 7 }).notNull(),
})

export const ComponentRelations = relations(
    ComponentTable,
    ({ one, many }) => ({
        boardSetups: many(BoardSetupTable),
        componentAttributes: one(ComponentAttributesTable),
    })
)

export const ComponentAttributesRelations = relations(
    ComponentAttributesTable,
    ({ one }) => ({
        component: one(ComponentTable, {
            fields: [ComponentAttributesTable.componentId],
            references: [ComponentTable.id],
        }),
        category: one(CategoryTable, {
            fields: [ComponentAttributesTable.categoryId],
            references: [CategoryTable.id],
        }),
        vendor: one(VendorTable, {
            fields: [ComponentAttributesTable.vendorId],
            references: [VendorTable.id],
        }),
        size: one(SizeTable, {
            fields: [ComponentAttributesTable.sizeId],
            references: [SizeTable.id],
        }),
        color: one(ColorTable, {
            fields: [ComponentAttributesTable.colorId],
            references: [ColorTable.id],
        }),
    })
)

export const CategoryRelations = relations(CategoryTable, ({ many }) => ({
    parent: many(ComponentAttributesTable),
}))

export const VendorRelations = relations(VendorTable, ({ many }) => ({
    parent: many(ComponentAttributesTable),
}))

export const SizeRelations = relations(SizeTable, ({ many }) => ({
    parent: many(ComponentAttributesTable),
}))

export const ColorRelations = relations(ColorTable, ({ many }) => ({
    parent: many(ComponentAttributesTable),
}))
