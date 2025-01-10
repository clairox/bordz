import { BoardSetupQueryResult } from '@/types/queries'
import { mapComponentResponseToComponent } from '.'

export const mapBoardResponseToBoard = (
    response: BoardSetupQueryResult
): Board => {
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
