'use client'

import React from 'react'
import { BoxGeometry, Mesh } from 'three'

import ComponentMeshBase from '../ComponentMeshBase'
import { useComponent } from '../ComponentBase'

const Deck = React.forwardRef<Mesh>(({}, ref) => {
    const { properties, handleMeshClick } = useComponent()

    const geometry = new BoxGeometry(3.6, 12, 0.2)

    return (
        <ComponentMeshBase
            ref={ref}
            geometry={geometry}
            color={properties?.color.value}
            onClick={handleMeshClick}
        />
    )
})

Deck.displayName = 'Deck'

export default Deck
