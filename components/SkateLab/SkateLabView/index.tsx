import { useState, useRef, RefObject, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, OrthographicCamera } from '@react-three/drei'

import {
    ComponentBase,
    Deck,
    Trucks,
    Wheels,
    Bearings,
    Hardware,
    Griptape,
} from '../SkateLabComponents'

const Vector3 = (x?: number, y?: number, z?: number) =>
    new THREE.Vector3(x, y, z)
const Euler = (x?: number, y?: number, z?: number) => new THREE.Euler(x, y, z)

type SkateLabViewProps = {
    selectedComponents: Record<ComponentType, string | undefined>
    componentToFocus: ComponentTypeOrNone
    setComponentToFocus: (component: ComponentTypeOrNone) => void
}

const SkateLabView: React.FC<SkateLabViewProps> = ({
    selectedComponents,
    componentToFocus,
    setComponentToFocus,
}) => {
    const [focusTarget, setFocusTarget] = useState(Vector3(0))
    const [boardRotation, setBoardRotation] = useState(
        Euler(Math.PI / -5, 0, 0)
    )
    const [cameraProps, setCameraProps] = useState({
        position: Vector3(5, 4, 4),
        zoom: 50,
    })

    const boardFocusRef = useRef<THREE.Group>(null)
    const deckFocusRef = useRef<THREE.Mesh>(null)
    const trucksFocusRef = useRef<THREE.Mesh>(null)
    const wheelsFocusRef = useRef<THREE.Mesh>(null)
    const bearingsFocusRef = useRef<THREE.Mesh>(null)
    const hardwareFocusRef = useRef<THREE.Mesh>(null)
    const griptapeFocusRef = useRef<THREE.Mesh>(null)

    type ComponentFocusData = {
        focusRef: RefObject<THREE.Object3D>
        boardRotation: THREE.Euler
        cameraOffset: THREE.Vector3
        cameraZoom: number
    }

    const componentFoci: Record<ComponentTypeOrNone, ComponentFocusData> =
        useMemo(() => {
            return {
                none: {
                    focusRef: boardFocusRef,
                    boardRotation: Euler(Math.PI / -5, 0, 0),
                    cameraOffset: Vector3(5, 4, 4),
                    cameraZoom: 50,
                },
                deck: {
                    focusRef: deckFocusRef,
                    boardRotation: Euler(0),
                    cameraOffset: Vector3(0, 0, 10),
                    cameraZoom: 50,
                },
                trucks: {
                    focusRef: trucksFocusRef,
                    boardRotation: Euler(Math.PI / 2, Math.PI, 0),
                    cameraOffset: Vector3(0, 0, 10),
                    cameraZoom: 100,
                },
                wheels: {
                    focusRef: wheelsFocusRef,
                    boardRotation: Euler(Math.PI / -5, 0, 0),
                    cameraOffset: Vector3(10, 0, 5),
                    cameraZoom: 200,
                },
                bearings: {
                    focusRef: bearingsFocusRef,
                    boardRotation: Euler(Math.PI / -5, 0, 0),
                    cameraOffset: Vector3(10, 0, 0),
                    cameraZoom: 450,
                },
                hardware: {
                    focusRef: hardwareFocusRef,
                    boardRotation: Euler(0),
                    cameraOffset: Vector3(4, 0, -10),
                    cameraZoom: 100,
                },
                griptape: {
                    focusRef: griptapeFocusRef,
                    boardRotation: Euler(0),
                    cameraOffset: Vector3(0, 0, -10),
                    cameraZoom: 50,
                },
            }
        }, [])

    useEffect(() => {
        const {
            focusRef: { current: targetComponent },
            boardRotation,
            cameraOffset,
            cameraZoom,
        } = componentFoci[componentToFocus]

        if (!targetComponent) {
            return
        }

        if (!boardFocusRef.current) {
            return
        }

        const targetComponentPosition = Vector3()
        targetComponent.getWorldPosition(targetComponentPosition)
        boardFocusRef.current.worldToLocal(targetComponentPosition)

        const rotationMatrix = new THREE.Matrix4()
        rotationMatrix.makeRotationFromEuler(boardRotation)

        targetComponentPosition.applyMatrix4(rotationMatrix)

        const cameraPosition = Vector3().addVectors(
            targetComponentPosition,
            cameraOffset
        )

        setFocusTarget(targetComponentPosition)
        setCameraProps({ position: cameraPosition, zoom: cameraZoom })
        setBoardRotation(boardRotation)
    }, [componentFoci, componentToFocus])

    return (
        <Canvas onPointerMissed={() => setComponentToFocus('none')}>
            <OrthographicCamera makeDefault {...cameraProps} />
            <group ref={boardFocusRef} rotation={boardRotation}>
                <ComponentBase
                    id={selectedComponents.deck}
                    onClick={() => setComponentToFocus('deck')}
                >
                    <Deck ref={deckFocusRef} />
                </ComponentBase>
                <ComponentBase
                    id={selectedComponents.trucks}
                    onClick={() => setComponentToFocus('trucks')}
                >
                    <Trucks ref={trucksFocusRef} />
                </ComponentBase>
                <ComponentBase
                    id={selectedComponents.wheels}
                    onClick={() => setComponentToFocus('wheels')}
                >
                    <Wheels ref={wheelsFocusRef} />
                </ComponentBase>
                <ComponentBase
                    id={selectedComponents.bearings}
                    onClick={() => setComponentToFocus('bearings')}
                >
                    <Bearings ref={bearingsFocusRef} />
                </ComponentBase>
                <ComponentBase
                    id={selectedComponents.hardware}
                    onClick={() => setComponentToFocus('hardware')}
                >
                    <Hardware ref={hardwareFocusRef} />
                </ComponentBase>
                <ComponentBase
                    id={selectedComponents.griptape}
                    onClick={() => setComponentToFocus('griptape')}
                >
                    <Griptape ref={griptapeFocusRef} />
                </ComponentBase>
            </group>
            <ambientLight intensity={5} />
            <directionalLight position={Vector3(-3.2, 5.6, 5)} />
            <OrbitControls
                enableZoom={false}
                enableDamping={false}
                target={focusTarget}
            />
        </Canvas>
    )
}

export default SkateLabView
