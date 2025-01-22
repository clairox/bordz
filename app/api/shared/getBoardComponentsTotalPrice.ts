import { BoardComponentRecord } from '@/types/database'

const getBoardComponentsTotalPrice = (
    boardComponents: Record<string, BoardComponentRecord>
): number => {
    return Object.values(boardComponents).reduce(
        (price, boardComponent) => price + boardComponent.price,
        0
    )
}

export default getBoardComponentsTotalPrice
