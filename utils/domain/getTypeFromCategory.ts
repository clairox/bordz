export const getTypeFromCategory = (
    category: Category['label']
): BoardComponentType => {
    const categoryAsBoardComponentType: Record<
        Category['label'],
        BoardComponentType
    > = {
        Decks: 'deck',
        Trucks: 'trucks',
        Wheels: 'wheels',
        Bearings: 'bearings',
        Hardware: 'hardware',
        Griptape: 'griptape',
    }

    return categoryAsBoardComponentType[category]
}
