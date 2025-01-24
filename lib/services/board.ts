import { BoardComponentQueryResult, BoardQueryResult } from '@/types/queries'
import { CreateBoardValues } from '@/types/services'
import * as db from 'db'
import { createBadRequestError, createNotFoundError } from '../errors'
import { BoardComponentRecord } from '@/types/database'

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

// export async function getBoardComponents(
//     options?: PaginatedQueryOptions
// ): Promise<Page<BoardComponentQueryResult>> {
//     const page = options?.page ?? DEFAULT_PAGE_NUMBER
//     const size = options?.size ?? DEFAULT_PAGE_SIZE
//     const orderBy = options?.orderBy ?? DEFAULT_SORT_KEY
//
//     const { components, totalCount } = await db.getBoardComponents({
//         limit: size,
//         offset: (page - 1) * size,
//         orderBy,
//     })
//
//     const totalPages = calculateTotalPages(size, totalCount)
//     const nextPage = calculateNextPage(page, size, totalCount)
//     return { data: components, totalCount, totalPages, nextPage }
// }

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
