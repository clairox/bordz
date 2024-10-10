import { pgTableWithAutoFields, shortUuid } from './shared'
import { ProductTable } from './product'
import { relations } from 'drizzle-orm'
import { ComponentTable } from './component'

export const BoardSetupTable = pgTableWithAutoFields('board_setups', {
    productId: shortUuid('product_id')
        .references(() => ProductTable.id, { onDelete: 'cascade' })
        .notNull(),
    deckId: shortUuid('deck_id')
        .references(() => ComponentTable.id, { onDelete: 'cascade' })
        .notNull(),
    trucksId: shortUuid('trucks_id')
        .references(() => ComponentTable.id, { onDelete: 'cascade' })
        .notNull(),
    wheelsId: shortUuid('wheels_id')
        .references(() => ComponentTable.id, { onDelete: 'cascade' })
        .notNull(),
    bearingsId: shortUuid('bearings_id')
        .references(() => ComponentTable.id, { onDelete: 'cascade' })
        .notNull(),
    hardwareId: shortUuid('hardware_id')
        .references(() => ComponentTable.id, { onDelete: 'cascade' })
        .notNull(),
    griptapeId: shortUuid('griptape_id')
        .references(() => ComponentTable.id, { onDelete: 'cascade' })
        .notNull(),
})

export const BoardSetupRelations = relations(BoardSetupTable, ({ one }) => ({
    product: one(ProductTable, {
        fields: [BoardSetupTable.productId],
        references: [ProductTable.id],
    }),
    deck: one(ComponentTable, {
        fields: [BoardSetupTable.deckId],
        references: [ComponentTable.id],
    }),
    trucks: one(ComponentTable, {
        fields: [BoardSetupTable.trucksId],
        references: [ComponentTable.id],
    }),
    wheels: one(ComponentTable, {
        fields: [BoardSetupTable.wheelsId],
        references: [ComponentTable.id],
    }),
    bearings: one(ComponentTable, {
        fields: [BoardSetupTable.bearingsId],
        references: [ComponentTable.id],
    }),
    hardware: one(ComponentTable, {
        fields: [BoardSetupTable.hardwareId],
        references: [ComponentTable.id],
    }),
    griptape: one(ComponentTable, {
        fields: [BoardSetupTable.griptapeId],
        references: [ComponentTable.id],
    }),
}))
