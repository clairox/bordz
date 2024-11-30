'use client'

import React from 'react'
import { BoxGeometry, Mesh } from 'three'

import ComponentMeshBase from '../ComponentMeshBase'
import { useComponent } from '../ComponentBase'

const Griptape = React.forwardRef<Mesh>(({}, ref) => {
    const { properties, handleMeshClick } = useComponent()

    const geometry = new BoxGeometry(3.4, 11.8, 0.05)

    return (
        <ComponentMeshBase
            ref={ref}
            position={[0, 0, -0.1]}
            geometry={geometry}
            color={properties?.color.value}
            onClick={handleMeshClick}
        />
    )
})

Griptape.displayName = 'Griptape'

export default Griptape
