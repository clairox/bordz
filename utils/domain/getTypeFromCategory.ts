export const getTypeFromCategory = (
    category: Category['label']
): ComponentType => {
    const categoryAsComponentType: Record<Category['label'], ComponentType> = {
        Decks: 'deck',
        Trucks: 'trucks',
        Wheels: 'wheels',
        Bearings: 'bearings',
        Hardware: 'hardware',
        Griptape: 'griptape',
    }

    return categoryAsComponentType[category]
}
