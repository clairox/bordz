import { BoardFullQueryResult, BoardQueryResult } from '@/types/queries'
import {
    mapBoardComponentResponseToBoardComponent,
    mapBoardComponentResponseToBoardComponentSummary,
} from '.'

export const mapBoardResponseToBoard = (response: BoardQueryResult): Board => {
    const { deck, trucks, wheels, bearings, hardware, griptape } = response

    return {
        id: response.id,
        productId: response.productId,
        deck: mapBoardComponentResponseToBoardComponentSummary(deck),
        trucks: mapBoardComponentResponseToBoardComponentSummary(trucks),
        wheels: mapBoardComponentResponseToBoardComponentSummary(wheels),
        bearings: mapBoardComponentResponseToBoardComponentSummary(bearings),
        hardware: mapBoardComponentResponseToBoardComponentSummary(hardware),
        griptape: mapBoardComponentResponseToBoardComponentSummary(griptape),
    }
}

export const mapBoardResponseToBoardFull = (
    response: BoardFullQueryResult
): BoardFull => {
    const { deck, trucks, wheels, bearings, hardware, griptape } = response

    return {
        id: response.id,
        productId: response.productId,
        deck: mapBoardComponentResponseToBoardComponent(deck),
        trucks: mapBoardComponentResponseToBoardComponent(trucks),
        wheels: mapBoardComponentResponseToBoardComponent(wheels),
        bearings: mapBoardComponentResponseToBoardComponent(bearings),
        hardware: mapBoardComponentResponseToBoardComponent(hardware),
        griptape: mapBoardComponentResponseToBoardComponent(griptape),
    }
}
