import fetchAbsolute from '@/lib/fetchAbsolute'
import { BoardFullResponse, BoardResponse } from '@/types/api'
import {
    mapBoardResponseToBoard,
    mapBoardResponseToBoardFull,
} from '@/utils/conversions'

export const fetchBoardByProductId = async (
    productId: string
): Promise<Board> => {
    const data = await fetchAbsolute<BoardResponse>(
        `/products/${productId}/board`
    )
    return mapBoardResponseToBoard(data)
}

export const fetchBoardFullByProductId = async (
    productId: string
): Promise<BoardFull> => {
    const data = await fetchAbsolute<BoardFullResponse>(
        `/products/${productId}/board?full=true`
    )
    return mapBoardResponseToBoardFull(data)
}
