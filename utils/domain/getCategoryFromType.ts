export const getCategoryFromType = (type: ComponentType): Category['label'] => {
    const componentTypeAsCategory = {
        deck: 'Decks',
        trucks: 'Trucks',
        wheels: 'Wheels',
        bearings: 'Bearings',
        hardware: 'Hardware',
        griptape: 'Griptape',
    }

    return componentTypeAsCategory[type]
}
