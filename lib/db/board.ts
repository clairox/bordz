'use server'

import { eq, or, sql, SQL } from 'drizzle-orm'

import {
    BoardComponentQueryResult,
    BoardComponentSummaryQueryResult,
    BoardFullQueryResult,
    BoardQueryResult,
} from '@/types/queries'
import { db } from '@/drizzle/db'
import { Boards } from '@/drizzle/schema/board'
import {
    BoardComponentRecord,
    BoardRecord,
    CreateBoardRecordArgs,
} from '@/types/database'
import { BoardComponents } from '@/drizzle/schema/boardComponent'

export async function getBoard(
    id: BoardRecord['id']
): Promise<BoardQueryResult | undefined> {
    return await db.query.Boards.findFirst({
        where: eq(Boards.id, id),
        with: boardWith(false),
    })
}

export async function getBoardByProductId(
    productId: BoardRecord['productId']
): Promise<BoardQueryResult | undefined> {
    return await db.query.Boards.findFirst({
        where: eq(Boards.productId, productId),
        with: boardWith(false),
    })
}

export async function createBoard(
    values: CreateBoardRecordArgs
): Promise<BoardFullQueryResult> {
    const [newBoard] = await db.insert(Boards).values(values).returning()
    const result = await db.query.Boards.findFirst({
        where: eq(Boards.id, newBoard.id),
        with: boardWith(false),
    })
    return result!
}

export async function getBoardComponent(
    id: BoardComponentRecord['id']
): Promise<BoardComponentQueryResult | undefined> {
    return await db.query.BoardComponents.findFirst({
        where: eq(BoardComponents.id, id),
        with: {
            attrs: componentAttrsWith(true),
        },
    })
}

export async function getBoardComponentsByIds(
    ids: BoardComponentRecord['id'][]
): Promise<BoardComponentQueryResult[]> {
    const conditions: SQL[] = []
    ids.forEach(id => conditions.push(eq(BoardComponents.id, id)))

    return await db.query.BoardComponents.findMany({
        where: or(...conditions),
        with: {
            attrs: componentAttrsWith(true),
        },
    })
}

export async function incrementBoardComponentUsageCount(
    id: BoardComponentRecord['id']
): Promise<void> {
    await db
        .update(BoardComponents)
        .set({ usageCount: sql`${BoardComponents.usageCount} + 1` })
        .where(eq(BoardComponents.id, id))
}

const boardWith = (full: boolean = false) => ({
    deck: withAttributes(full),
    trucks: withAttributes(full),
    wheels: withAttributes(full),
    bearings: withAttributes(full),
    hardware: withAttributes(full),
    griptape: withAttributes(full),
})

const componentAttrsWith = (full: boolean = false) => {
    const value = withAttributes(full)
    if (typeof value !== 'boolean') {
        return value.with.attrs
    }
    return value
}

const withAttributes = (
    value: boolean = false
):
    | {
          with: {
              attrs: {
                  with: {
                      category: true
                      vendor: true
                      size: true
                      color: true
                  }
              }
          }
      }
    | true => {
    if (value) {
        return {
            with: {
                attrs: {
                    with: {
                        category: true,
                        vendor: true,
                        size: true,
                        color: true,
                    },
                },
            },
        }
    } else {
        return true
    }
}
