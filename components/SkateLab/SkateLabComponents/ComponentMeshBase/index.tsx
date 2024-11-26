import React from 'react'
import { Mesh } from 'three'
import { MeshProps, ThreeEvent } from '@react-three/fiber'
import { Edges } from '@react-three/drei'

type ComponentMeshBaseProps = MeshProps & {
    // TODO: Use more appropriate type
    color?: string
    onClick: () => void
}
const ComponentMeshBase = React.forwardRef<Mesh, ComponentMeshBaseProps>(
    (props, ref) => {
        const handleMeshClick = (e: ThreeEvent<MouseEvent>) => {
            e.stopPropagation()
            props.onClick()
        }
        return (
            <mesh
                ref={ref}
                geometry={props.geometry}
                position={props.position}
                rotation={props.rotation}
                onClick={handleMeshClick}
            >
                <meshStandardMaterial color={props.color || 'white'} />
                <Edges color="black" />
            </mesh>
        )
    }
)

ComponentMeshBase.displayName = 'ComponentMeshBase'

export default ComponentMeshBase
