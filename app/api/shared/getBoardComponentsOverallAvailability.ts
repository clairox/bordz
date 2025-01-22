import { BoardComponentRecord } from '@/types/database'

const getBoardComponentsOverallAvailability = (
    boardComponents: Record<string, BoardComponentRecord>
): boolean => {
    return Object.values(boardComponents).every(
        boardComponent => boardComponent.availableForSale
    )
}

export default getBoardComponentsOverallAvailability
