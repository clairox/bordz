import { BoardComponentQueryResult, BoardQueryResult } from '@/types/queries'
import {
    CreateBoardComponentValues,
    CreateBoardValues,
    UpdateBoardComponentValues,
} from '@/types/services'
import * as db from 'db'
import { createBadRequestError, createNotFoundError } from '../errors'
import { BoardComponentRecord, CategoryRecord } from '@/types/database'
import { PaginatedQueryOptions } from '@/types/api'
import {
    DEFAULT_PAGE_NUMBER,
    DEFAULT_PAGE_SIZE,
    DEFAULT_SORT_KEY,
} from '@/utils/constants'
import { calculateNextPage, calculateTotalPages } from '@/utils/math'
import { createUrlHandle } from '@/utils/url'

export async function getBoardByProductId(
    productId: string
): Promise<BoardQueryResult> {
    const board = await db.getBoardByProductId(productId)
    if (!board) {
        throw createNotFoundError('Board')
    }
    return board
}

export async function createBoard(
    values: CreateBoardValues
): Promise<BoardQueryResult> {
    const { productId, ...boardComponentIds } = values

    const product = await db.getProduct(productId)
    if (product?.productType !== 'BOARD') {
        throw createBadRequestError('Product is not of board type.')
    }

    const components = await db.getBoardComponentsByIds(
        Object.values(boardComponentIds)
    )

    validateBoardComponents(components, boardComponentIds)
    const newBoard = await db.createBoard({ productId, ...boardComponentIds })

    for await (const component of components) {
        await db.incrementBoardComponentUsageCount(component.id)
    }

    const result = await db.getBoard(newBoard.id)
    return result!
}

export async function getBoardComponent(
    id: BoardComponentRecord['id']
): Promise<BoardComponentQueryResult> {
    const component = await db.getBoardComponent(id)
    if (!component) {
        throw createNotFoundError('Board component')
    }
    return component
}

export async function createBoardComponent(
    values: CreateBoardComponentValues
): Promise<BoardComponentQueryResult> {
    return await db.createBoardComponent({
        ...values,
        handle: createUrlHandle(values.title),
    })
}

export async function updateBoardComponent(
    id: BoardComponentRecord['id'],
    values: UpdateBoardComponentValues
): Promise<BoardComponentQueryResult> {
    const updatedComponent = await db.updateBoardComponent(id, values)
    if (!updatedComponent) {
        throw createNotFoundError('Board component')
    }
    return updatedComponent
}

export async function deleteBoardComponent(
    id: BoardComponentRecord['id']
): Promise<BoardComponentRecord['id']> {
    const deletedComponentId = await db.deleteBoardComponent(id)
    if (!deletedComponentId) {
        throw createNotFoundError('Board component')
    }
    return deletedComponentId
}

export async function getBoardComponents(
    category: CategoryRecord['label'] | undefined,
    options?: PaginatedQueryOptions
): Promise<Page<BoardComponentQueryResult>> {
    const page = options?.page ?? DEFAULT_PAGE_NUMBER
    const size = options?.size ?? DEFAULT_PAGE_SIZE
    const orderBy = options?.orderBy ?? DEFAULT_SORT_KEY

    const { boardComponents, totalCount } = await db.getBoardComponents({
        category,
        limit: size,
        offset: (page - 1) * size,
        orderBy,
    })

    const totalPages = calculateTotalPages(size, totalCount)
    const nextPage = calculateNextPage(page, size, totalCount)
    return { data: boardComponents, totalCount, totalPages, nextPage }
}

export async function deleteBoardComponents(
    ids: BoardComponentRecord['id'][]
): Promise<BoardComponentRecord['id'][]> {
    return await db.deleteBoardComponents(ids)
}

// Verify that all components are present and of the correct categories
function validateBoardComponents(
    components: BoardComponentQueryResult[],
    ids: Omit<CreateBoardValues, 'productId'>
): void {
    const categories = new Set()
    components.forEach(component => {
        const category = component.attrs?.category
        if (!category) {
            return
        }
        const { label } = category
        const { id } = component

        if (label === 'Decks' && id !== ids.deckId) {
            return
        } else if (label === 'Trucks' && id !== ids.trucksId) {
            return
        } else if (label === 'Wheels' && id !== ids.wheelsId) {
            return
        } else if (label === 'Bearings' && id !== ids.bearingsId) {
            return
        } else if (label === 'Hardware' && id !== ids.hardwareId) {
            return
        } else if (label === 'Griptape' && id !== ids.griptapeId) {
            return
        }

        categories.add(label)
    })

    if (categories.size < 6) {
        throw createBadRequestError('Invalid component id')
    }
}
