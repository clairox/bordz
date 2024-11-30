import { createContext, useContext, useEffect, useState } from 'react'

import { getCategoryFromType, getTypeFromCategory } from '@/utils/helpers'

type ComponentSelectorContextValue = {
    selectedComponents: Record<ComponentType, string | undefined>
    activeComponentType: ComponentTypeOrNone
    updateSelectedComponents: (
        componentType: ComponentType,
        componentId: string
    ) => void
    setActiveComponentType: (componentType: ComponentTypeOrNone) => void
}

const SkateLabComponentSelectorContext =
    createContext<ComponentSelectorContextValue>(
        {} as ComponentSelectorContextValue
    )

const useComponentSelector = () => {
    const {
        selectedComponents,
        activeComponentType,
        updateSelectedComponents,
        setActiveComponentType,
    } = useContext(SkateLabComponentSelectorContext)

    const categories: Category['label'][] = [
        'Decks',
        'Trucks',
        'Wheels',
        'Bearings',
        'Hardware',
        'Griptape',
    ]

    const [currentCategory, setCurrentCategory] = useState(() => {
        return activeComponentType === 'none'
            ? categories[0]
            : getCategoryFromType(activeComponentType)
    })

    useEffect(() => {
        setActiveComponentType(getTypeFromCategory(currentCategory))
    }, [currentCategory, setActiveComponentType])

    useEffect(() => {
        if (activeComponentType !== 'none') {
            setCurrentCategory(getCategoryFromType(activeComponentType))
        }
    }, [activeComponentType])

    const handleComponentSelect = (
        category: Category['label'],
        component: Component
    ) => {
        if (!component.availableForSale) {
            return
        }

        updateSelectedComponents(getTypeFromCategory(category), component.id)
    }

    return {
        selectedComponents,
        activeComponentType,
        setActiveComponentType,
        handleComponentSelect,
        categories,
        currentCategory,
        setCurrentCategory,
    }
}

export { SkateLabComponentSelectorContext, useComponentSelector }
