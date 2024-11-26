'use client'

import React, { Fragment } from 'react'
import { BoxGeometry, Mesh } from 'three'

import ComponentMeshBase from '../ComponentMeshBase'
import { useComponent } from '../ComponentBase'

const Trucks = React.forwardRef<Mesh>(({}, ref) => {
    const { properties, handleMeshClick } = useComponent()

    const color = properties?.color.value

    const geometry = new BoxGeometry(2.4, 0.8, 1.4)

    return (
        <Fragment>
            <ComponentMeshBase
                ref={ref}
                position={[0, 3, 0.8]}
                geometry={geometry}
                color={color}
                onClick={handleMeshClick}
            />
            <ComponentMeshBase
                position={[0, -3, 0.8]}
                geometry={geometry}
                color={color}
                onClick={handleMeshClick}
            />
        </Fragment>
    )
})

Trucks.displayName = 'Trucks'

export default Trucks
