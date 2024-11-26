'use client'

import React, { Fragment } from 'react'
import { CylinderGeometry, Euler, Mesh } from 'three'

import ComponentMeshBase from '../ComponentMeshBase'
import { useComponent } from '../ComponentBase'

const Bearings = React.forwardRef<Mesh>(({}, ref) => {
    const { properties, handleMeshClick } = useComponent()

    const color = properties?.color.value

    const geometry = new CylinderGeometry(0.2, 0.2, 0.2, 6)
    const leftBearingRotation = new Euler(0, 0, Math.PI / -2)
    const rightBearingRotation = new Euler(0, 0, Math.PI / 2)

    return (
        <Fragment>
            <ComponentMeshBase
                ref={ref}
                position={[1.9, 3, 1.2]}
                rotation={rightBearingRotation}
                geometry={geometry}
                color={color}
                onClick={handleMeshClick}
            />
            <ComponentMeshBase
                position={[-1.9, 3, 1.2]}
                rotation={leftBearingRotation}
                geometry={geometry}
                color={color}
                onClick={handleMeshClick}
            />
            <ComponentMeshBase
                position={[1.9, -3, 1.2]}
                rotation={rightBearingRotation}
                geometry={geometry}
                color={color}
                onClick={handleMeshClick}
            />
            <ComponentMeshBase
                position={[-1.9, -3, 1.2]}
                rotation={leftBearingRotation}
                geometry={geometry}
                color={color}
                onClick={handleMeshClick}
            />
        </Fragment>
    )
})

Bearings.displayName = 'Bearings'

export default Bearings
