'use client'

import React from 'react'

import { useSkateLabContext } from '@/context/SkateLabContext'

type SL3DComponentProps = {
    type: ComponentType
    render: (visible: boolean, handleClick: () => void) => React.ReactNode
}
const SL3DComponent: React.FC<SL3DComponentProps> = ({ type, render }) => {
    const { activeComponentType, setActiveComponentType } = useSkateLabContext()

    const visible =
        activeComponentType === 'none' || activeComponentType === type
    const handleClick = () => setActiveComponentType(type)

    return render(visible, handleClick)
}

export { SL3DComponent }
