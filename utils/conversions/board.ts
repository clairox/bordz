import { BoardFullQueryResult, BoardSetupQueryResult } from '@/types/queries'
import {
    mapComponentResponseToComponent,
    mapComponentResponseToComponentSummary,
} from '.'

export const mapBoardResponseToBoard = (
    response: BoardSetupQueryResult
): Board => {
    const { deck, trucks, wheels, bearings, hardware, griptape } = response

    return {
        id: response.id,
        productId: response.productId,
        deck: mapComponentResponseToComponentSummary(deck),
        trucks: mapComponentResponseToComponentSummary(trucks),
        wheels: mapComponentResponseToComponentSummary(wheels),
        bearings: mapComponentResponseToComponentSummary(bearings),
        hardware: mapComponentResponseToComponentSummary(hardware),
        griptape: mapComponentResponseToComponentSummary(griptape),
    }
}

export const mapBoardResponseToBoardFull = (
    response: BoardFullQueryResult
): BoardFull => {
    const { deck, trucks, wheels, bearings, hardware, griptape } = response

    return {
        id: response.id,
        productId: response.productId,
        deck: mapComponentResponseToComponent(deck),
        trucks: mapComponentResponseToComponent(trucks),
        wheels: mapComponentResponseToComponent(wheels),
        bearings: mapComponentResponseToComponent(bearings),
        hardware: mapComponentResponseToComponent(hardware),
        griptape: mapComponentResponseToComponent(griptape),
    }
}
