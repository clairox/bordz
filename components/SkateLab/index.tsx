'use client'

import { useState } from 'react'

import SkateLabInterface from './SkateLabInterface'
import SkateLabView from './SkateLabView'

const SkateLabContainer = () => {
    const defaultBoardSetup: Record<ComponentType, string | undefined> = {
        deck: undefined,
        trucks: undefined,
        wheels: undefined,
        bearings: undefined,
        hardware: undefined,
        griptape: undefined,
    }

    const [selectedComponents, setSelectedComponents] =
        useState(defaultBoardSetup)
    const [activeComponentType, setActiveComponentType] =
        useState<ComponentTypeOrNone>('none')

    const updateSelectedComponents = (component: ComponentType, id: string) => {
        setSelectedComponents(prev => {
            const updatedSetup = { ...prev }
            updatedSetup[component] = id

            return updatedSetup
        })
    }

    const isComplete = !Object.values(selectedComponents).includes(undefined)

    return (
        <div className="relative w-full h-[800px]">
            <SkateLabInterface
                selectedComponents={selectedComponents}
                isComplete={isComplete}
                activeComponentType={activeComponentType}
                updateSelectedComponents={updateSelectedComponents}
                setActiveComponentType={setActiveComponentType}
                reset={() => setSelectedComponents(defaultBoardSetup)}
            />
            <SkateLabView
                selectedComponents={selectedComponents}
                componentToFocus={activeComponentType}
                setComponentToFocus={setActiveComponentType}
            />
        </div>
    )
}

export default SkateLabContainer
