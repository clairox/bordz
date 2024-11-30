'use client'

import { createContext, useContext, useEffect, useState } from 'react'

import { useComponentModelPropsQuery } from '@/hooks'

type ComponentContextValue = {
    id: string | undefined
    onClick: () => void
    setIsLoading: (value: boolean) => void
}

const ComponentContext = createContext<ComponentContextValue>(
    {} as ComponentContextValue
)

const useComponent = () => {
    const { id, onClick, setIsLoading } = useContext(ComponentContext)

    const { data: propData, status: propStatus } =
        useComponentModelPropsQuery(id)

    const [firstLoad, setFirstLoad] = useState(true)
    const [properties, setProperties] = useState(propData)

    useEffect(() => {
        setProperties(prev => {
            if (!propData) {
                return prev
            }

            return propData
        })
    }, [propData, id])

    useEffect(() => {
        if (propStatus === 'pending') {
            setIsLoading(true)
        } else if (propStatus === 'success' && firstLoad) {
            console.log('First load')
            setFirstLoad(false)
            setIsLoading(false)
        } else if (propStatus === 'success' && !firstLoad && id != undefined) {
            console.log('Not first load')
            setIsLoading(false)
        }
    }, [propData, propStatus, firstLoad, setIsLoading, id])

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
