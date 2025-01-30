'use server'

import { asc, desc, eq, inArray, or, sql, SQL } from 'drizzle-orm'

import {
    BoardComponentQueryResult,
    BoardFullQueryResult,
    BoardQueryResult,
} from '@/types/queries'
import { db } from '@/drizzle/db'
import { Boards } from '@/drizzle/schema/board'
import {
    BoardComponentAttrsRecord,
    BoardComponentRecord,
    BoardRecord,
    CategoryRecord,
    CreateBoardComponentAttrsRecordArgs,
    CreateBoardComponentRecordArgs,
    CreateBoardRecordArgs,
    UpdateBoardComponentAttrsRecordArgs,
    UpdateBoardComponentRecordArgs,
} from '@/types/database'
import {
    BoardComponentAttrs,
    BoardComponents,
    Categories,
    Colors,
    Sizes,
    Vendors,
} from '@/drizzle/schema/boardComponent'
import { SortKey } from '@/types/sorting'
import { DEFAULT_PAGE_SIZE, DEFAULT_SORT_KEY } from '@/utils/constants'

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

export async function createBoardComponent(
    values: CreateBoardComponentRecordArgs
): Promise<BoardComponentQueryResult> {
    const { category, vendor, size, color, ...rest } = values
    const availableForSale = !!rest.totalInventory && rest.totalInventory > 0
    const [newComponent] = await db
        .insert(BoardComponents)
        .values({ ...rest, availableForSale })
        .returning()

    await createBoardComponentAttrs({
        boardComponentId: newComponent.id,
        categoryId: category,
        vendorId: vendor,
        sizeId: size,
        colorId: color,
    })

    const result = await db.query.BoardComponents.findFirst({
        where: eq(BoardComponents.id, newComponent.id),
        with: {
            attrs: componentAttrsWith(true),
        },
    })

    return result!
}

// TODO: Generate handle on title update
export async function updateBoardComponent(
    id: BoardComponentRecord['id'],
    values: UpdateBoardComponentRecordArgs
): Promise<BoardComponentQueryResult> {
    const { category, vendor, size, color, ...rest } = values
    const availableForSale = !!rest.totalInventory && rest.totalInventory > 0
    const [updatedComponent] = await db
        .update(BoardComponents)
        .set({ ...rest, availableForSale, updatedAt: new Date() })
        .where(eq(BoardComponents.id, id))
        .returning()

    if (category || vendor || size || color) {
        await updateBoardComponentAttrs(updatedComponent.id, {
            categoryId: category,
            vendorId: vendor,
            sizeId: size,
            colorId: color,
        })
    }

    const result = await db.query.BoardComponents.findFirst({
        where: eq(BoardComponents.id, updatedComponent.id),
        with: {
            attrs: componentAttrsWith(true),
        },
    })

    return result!
}

export async function deleteBoardComponent(
    id: BoardComponentRecord['id']
): Promise<BoardComponentRecord['id']> {
    const [{ id: deletedComponentId }] = await db
        .delete(BoardComponents)
        .where(eq(BoardComponents.id, id))
        .returning({ id: BoardComponents.id })
    return deletedComponentId
}

// TODO: Use category id instead of label
export async function getBoardComponents(options?: {
    category?: CategoryRecord['label']
    limit?: number
    offset?: number
    orderBy?: SortKey
}): Promise<{
    boardComponents: BoardComponentQueryResult[]
    totalCount: number
}> {
    const sorts: Partial<Record<SortKey, SQL>> = {
        'date-desc': desc(BoardComponents.createdAt),
        'date-asc': asc(BoardComponents.createdAt),
        'price-desc': desc(BoardComponents.price),
        'price-asc': asc(BoardComponents.price),
        'alpha-desc': desc(BoardComponents.title),
        'alpha-asc': asc(BoardComponents.title),
    }

    const orderBy = sorts[options?.orderBy ?? DEFAULT_SORT_KEY] as SQL

    const componentQuery = db
        .select()
        .from(BoardComponents)
        .innerJoin(
            BoardComponentAttrs,
            eq(BoardComponents.id, BoardComponentAttrs.boardComponentId)
        )
        .innerJoin(
            Categories,
            eq(BoardComponentAttrs.categoryId, Categories.id)
        )
        .innerJoin(Sizes, eq(BoardComponentAttrs.sizeId, Sizes.id))
        .innerJoin(Colors, eq(BoardComponentAttrs.colorId, Colors.id))
        .innerJoin(Vendors, eq(BoardComponentAttrs.vendorId, Vendors.id))
        .where(
            options?.category
                ? eq(Categories.label, options?.category)
                : undefined
        )

    const totalCount = await db.$count(componentQuery)
    const boardComponents = await componentQuery
        .limit(options?.limit || DEFAULT_PAGE_SIZE)
        .offset(options?.offset || 0)
        .orderBy(orderBy)
        .then(rows => {
            return rows.map(row => {
                return {
                    ...row.board_components,
                    attrs: {
                        ...row.board_component_attrs,
                        category: { ...row.categories },
                        size: { ...row.sizes },
                        color: { ...row.colors },
                        vendor: { ...row.vendors },
                    },
                }
            })
        })

    return { boardComponents, totalCount }
}

export async function deleteBoardComponents(
    ids: BoardComponentRecord['id'][]
): Promise<BoardComponentRecord['id'][]> {
    const deletedComponents = await db
        .delete(BoardComponents)
        .where(inArray(BoardComponents.id, ids))
        .returning({ id: BoardComponents.id })

    return deletedComponents.map(c => c.id)
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

export async function createBoardComponentAttrs(
    values: CreateBoardComponentAttrsRecordArgs
): Promise<BoardComponentAttrsRecord> {
    const [newAttrs] = await db
        .insert(BoardComponentAttrs)
        .values(values)
        .returning()
    return newAttrs
}

export async function updateBoardComponentAttrs(
    boardComponentId: BoardComponentAttrsRecord['boardComponentId'],
    values: UpdateBoardComponentAttrsRecordArgs
): Promise<BoardComponentAttrsRecord> {
    const [newAttrs] = await db
        .update(BoardComponentAttrs)
        .set({ ...values, updatedAt: new Date() })
        .where(eq(BoardComponentAttrs.boardComponentId, boardComponentId))
        .returning()
    return newAttrs
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
