export const getCategoryFromType = (
    type: BoardComponentType
): Category['label'] => {
    const boardComponentTypeAsCategory = {
        deck: 'Decks',
        trucks: 'Trucks',
        wheels: 'Wheels',
        bearings: 'Bearings',
        hardware: 'Hardware',
        griptape: 'Griptape',
    }

    return boardComponentTypeAsCategory[type]
}
