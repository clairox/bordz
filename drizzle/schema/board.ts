import { relations } from 'drizzle-orm'

import { pgTableWithAutoFields, shortUuid } from './shared'
import { Products } from './product'
import { BoardComponents } from './boardComponent'

export const Boards = pgTableWithAutoFields('boards', {
    productId: shortUuid('product_id')
        .references(() => Products.id, { onDelete: 'cascade' })
        .notNull(),
    deckId: shortUuid('deck_id')
        .references(() => BoardComponents.id, { onDelete: 'cascade' })
        .notNull(),
    trucksId: shortUuid('trucks_id')
        .references(() => BoardComponents.id, { onDelete: 'cascade' })
        .notNull(),
    wheelsId: shortUuid('wheels_id')
        .references(() => BoardComponents.id, { onDelete: 'cascade' })
        .notNull(),
    bearingsId: shortUuid('bearings_id')
        .references(() => BoardComponents.id, { onDelete: 'cascade' })
        .notNull(),
    hardwareId: shortUuid('hardware_id')
        .references(() => BoardComponents.id, { onDelete: 'cascade' })
        .notNull(),
    griptapeId: shortUuid('griptape_id')
        .references(() => BoardComponents.id, { onDelete: 'cascade' })
        .notNull(),
})

export const BoardRelations = relations(Boards, ({ one }) => ({
    product: one(Products, {
        fields: [Boards.productId],
        references: [Products.id],
    }),
    deck: one(BoardComponents, {
        fields: [Boards.deckId],
        references: [BoardComponents.id],
    }),
    trucks: one(BoardComponents, {
        fields: [Boards.trucksId],
        references: [BoardComponents.id],
    }),
    wheels: one(BoardComponents, {
        fields: [Boards.wheelsId],
        references: [BoardComponents.id],
    }),
    bearings: one(BoardComponents, {
        fields: [Boards.bearingsId],
        references: [BoardComponents.id],
    }),
    hardware: one(BoardComponents, {
        fields: [Boards.hardwareId],
        references: [BoardComponents.id],
    }),
    griptape: one(BoardComponents, {
        fields: [Boards.griptapeId],
        references: [BoardComponents.id],
    }),
}))
