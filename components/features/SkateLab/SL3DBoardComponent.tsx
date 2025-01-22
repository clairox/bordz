'use client'

import React from 'react'

import { useSkateLabContext } from '@/context/SkateLabContext'

type SL3DBoardComponentProps = {
    type: BoardComponentType
    render: (visible: boolean, handleClick: () => void) => React.ReactNode
}
const SL3DBoardComponent: React.FC<SL3DBoardComponentProps> = ({
    type,
    render,
}) => {
    const { activeBoardComponentType, setActiveBoardComponentType } =
        useSkateLabContext()

    const visible =
        activeBoardComponentType === 'none' || activeBoardComponentType === type
    const handleClick = () => setActiveBoardComponentType(type)

    return render(visible, handleClick)
}

export { SL3DBoardComponent }
