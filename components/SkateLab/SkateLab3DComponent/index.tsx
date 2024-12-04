'use client'

import React from 'react'

import { useSkateLabContext } from '../SkateLabContext'

type SkateLab3DComponentProps = {
    type: ComponentType
    render: (visible: boolean, handleClick: () => void) => React.ReactNode
}
const SkateLab3DComponent: React.FC<SkateLab3DComponentProps> = ({
    type,
    render,
}) => {
    const { activeComponentType, setActiveComponentType } = useSkateLabContext()

    const visible =
        activeComponentType === 'none' || activeComponentType === type
    const handleClick = () => setActiveComponentType(type)

    return render(visible, handleClick)
}

export default SkateLab3DComponent
