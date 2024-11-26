'use client'

import { createContext, useContext, useEffect, useState } from 'react'

import { useComponentModelPropsQuery } from '@/hooks'

type ComponentContextValue = {
    id: string | undefined
    onClick: () => void
}

const ComponentContext = createContext<ComponentContextValue>(
    {} as ComponentContextValue
)

const useComponent = () => {
    const { id, onClick } = useContext(ComponentContext)

    const { data: propData } = useComponentModelPropsQuery(id)

    const [properties, setProperties] = useState(propData)

    useEffect(() => {
        setProperties(prev => {
            if (!propData) {
                return prev
            }

            return propData
        })
    }, [propData])

    const handleMeshClick = () => {
        onClick()
    }

    return { properties, handleMeshClick }
}

type ComponentBaseProps = React.PropsWithChildren<ComponentContextValue>

const ComponentBase: React.FC<ComponentBaseProps> = ({
    children,
    ...props
}) => {
    return (
        <ComponentContext.Provider value={props}>
            {children}
        </ComponentContext.Provider>
    )
}

export { ComponentBase, useComponent }
