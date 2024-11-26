const getCategoryFromType = (type: ComponentType): Category['label'] => {
    const componentTypeAsCategory: ComponentTypeAsCategory = {
        deck: 'Decks',
        trucks: 'Trucks',
        wheels: 'Wheels',
        bearings: 'Bearings',
        hardware: 'Hardware',
        griptape: 'Griptape',
    }

    return componentTypeAsCategory[type]
}

export default getCategoryFromType
