import { BoardSetupQueryResult } from '@/types/queries'
import componentResponseToComponent from './componentResponseToComponent'

const boardResponseToBoard = (data: BoardSetupQueryResult): Board => {
    const { deck, trucks, wheels, bearings, hardware, griptape } = data

    return {
        id: data.id,
        productId: data.productId,
        deck: componentResponseToComponent(deck),
        trucks: componentResponseToComponent(trucks),
        wheels: componentResponseToComponent(wheels),
        bearings: componentResponseToComponent(bearings),
        hardware: componentResponseToComponent(hardware),
        griptape: componentResponseToComponent(griptape),
    }
}

export default boardResponseToBoard
