import { BoardComponentQueryResult, BoardQueryResult } from '@/types/queries'
import { CreateBoardValues } from '@/types/services'
import * as db from 'db/board'
import { getProduct } from 'db/product'
import { createBadRequestError } from '../errors'

// BUG: Multiple boards can be made with same productId
export async function createBoard(
    values: CreateBoardValues
): Promise<BoardQueryResult> {
    const { productId, ...boardComponentIds } = values

    const product = await getProduct(productId)
    if (product?.productType !== 'BOARD') {
        throw createBadRequestError('Product is not of board type.')
    }

    const validComponents = await db.getBoardComponents(
        Object.values(boardComponentIds)
    )

    validateBoardComponents(validComponents, boardComponentIds)
    return await db.createBoard({ productId, ...boardComponentIds })
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
