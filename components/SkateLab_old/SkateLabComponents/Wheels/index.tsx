'use client'

import React, { Fragment } from 'react'
import { CylinderGeometry, Euler, Mesh } from 'three'

import ComponentMeshBase from '../ComponentMeshBase'
import { useComponent } from '../ComponentBase'

const Wheels = React.forwardRef<Mesh>(({}, ref) => {
    const { properties, handleMeshClick } = useComponent()

    const color = properties?.color.value

    const geometry = new CylinderGeometry(0.75, 0.75, 0.75, 6)
    const leftWheelRotation = new Euler(0, 0, Math.PI / -2)
    const rightWheelRotation = new Euler(0, 0, Math.PI / 2)

    return (
        <Fragment>
            <ComponentMeshBase
                ref={ref}
                position={[1.5, 3, 1.2]}
                rotation={rightWheelRotation}
                geometry={geometry}
                color={color}
                onClick={handleMeshClick}
            />
            <ComponentMeshBase
                position={[-1.5, 3, 1.2]}
                rotation={leftWheelRotation}
                geometry={geometry}
                color={color}
                onClick={handleMeshClick}
            />
            <ComponentMeshBase
                position={[1.5, -3, 1.2]}
                rotation={rightWheelRotation}
                geometry={geometry}
                color={color}
                onClick={handleMeshClick}
            />
            <ComponentMeshBase
                position={[-1.5, -3, 1.2]}
                rotation={leftWheelRotation}
                geometry={geometry}
                color={color}
                onClick={handleMeshClick}
            />
        </Fragment>
    )
})

Wheels.displayName = 'Wheels'

export default Wheels
