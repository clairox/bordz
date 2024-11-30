import { RefObject, useEffect, useMemo, useRef, useState } from 'react'
import { Group, Mesh, Euler, Vector3, Matrix4, Object3D } from 'three'
import { Canvas } from '@react-three/fiber'

import SkateLab3DComponent from '../SkateLab3DComponent'
import { useSkateLabContext } from '../SkateLabContext'
import { OrbitControls, OrthographicCamera } from '@react-three/drei'

const SkateLab3DViewport: React.FC = () => {
    const { activeComponentType, setActiveComponentType } = useSkateLabContext()

    const [focusTarget, setFocusTarget] = useState(new Vector3(0))
    const [boardRotation, setBoardRotation] = useState(
        new Euler(Math.PI / -5, 0, 0)
    )
    const [cameraProps, setCameraProps] = useState({
        position: new Vector3(5, 4, 4),
        zoom: 50,
    })

    const boardFocusRef = useRef<Group>(null)
    const deckFocusRef = useRef<Mesh>(null)
    const trucksFocusRef = useRef<Mesh>(null)
    const wheelsFocusRef = useRef<Mesh>(null)
    const bearingsFocusRef = useRef<Mesh>(null)
    const hardwareFocusRef = useRef<Mesh>(null)
    const griptapeFocusRef = useRef<Mesh>(null)

    type ComponentFocusData = {
        focusRef: RefObject<Object3D>
        boardRotation: Euler
        cameraOffset: Vector3
        cameraZoom: number
    }

    const componentFoci: Record<ComponentTypeOrNone, ComponentFocusData> =
        useMemo(() => {
            return {
                none: {
                    focusRef: boardFocusRef,
                    boardRotation: new Euler(Math.PI / -5, 0, 0),
                    cameraOffset: new Vector3(5, 4, 4),
                    cameraZoom: 50,
                },
                deck: {
                    focusRef: deckFocusRef,
                    boardRotation: new Euler(0),
                    cameraOffset: new Vector3(0, 0, 10),
                    cameraZoom: 50,
                },
                trucks: {
                    focusRef: trucksFocusRef,
                    boardRotation: new Euler(Math.PI / 2, Math.PI, 0),
                    cameraOffset: new Vector3(0, 0, 10),
                    cameraZoom: 100,
                },
                wheels: {
                    focusRef: wheelsFocusRef,
                    boardRotation: new Euler(Math.PI / -5, 0, 0),
                    cameraOffset: new Vector3(10, 0, 5),
                    cameraZoom: 200,
                },
                bearings: {
                    focusRef: bearingsFocusRef,
                    boardRotation: new Euler(Math.PI / -5, 0, 0),
                    cameraOffset: new Vector3(10, 0, 0),
                    cameraZoom: 450,
                },
                hardware: {
                    focusRef: hardwareFocusRef,
                    boardRotation: new Euler(0),
                    cameraOffset: new Vector3(4, 0, -10),
                    cameraZoom: 100,
                },
                griptape: {
                    focusRef: griptapeFocusRef,
                    boardRotation: new Euler(0),
                    cameraOffset: new Vector3(0, 0, -10),
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
        } = componentFoci[activeComponentType]

        if (!targetComponent) {
            return
        }

        if (!boardFocusRef.current) {
            return
        }

        const targetComponentPosition = new Vector3()
        targetComponent.getWorldPosition(targetComponentPosition)
        boardFocusRef.current.worldToLocal(targetComponentPosition)

        const rotationMatrix = new Matrix4()
        rotationMatrix.makeRotationFromEuler(boardRotation)

        targetComponentPosition.applyMatrix4(rotationMatrix)

        const cameraPosition = new Vector3().addVectors(
            targetComponentPosition,
            cameraOffset
        )

        setFocusTarget(targetComponentPosition)
        setCameraProps({ position: cameraPosition, zoom: cameraZoom })
        setBoardRotation(boardRotation)
    }, [componentFoci, activeComponentType])

    return (
        <Canvas onPointerMissed={() => setActiveComponentType('none')}>
            <OrthographicCamera makeDefault {...cameraProps} />
            <group ref={boardFocusRef} rotation={boardRotation}>
                <SkateLab3DComponent ref={deckFocusRef} type={'deck'} />
                <SkateLab3DComponent ref={trucksFocusRef} type={'trucks'} />
                <SkateLab3DComponent ref={wheelsFocusRef} type={'wheels'} />
                <SkateLab3DComponent ref={bearingsFocusRef} type={'bearings'} />
                <SkateLab3DComponent ref={hardwareFocusRef} type={'hardware'} />
                <SkateLab3DComponent ref={griptapeFocusRef} type={'griptape'} />
            </group>
            <ambientLight intensity={5} />
            <directionalLight position={new Vector3(-3.2, 5.6, 5)} />
            <OrbitControls
                enableZoom={false}
                enableDamping={false}
                target={focusTarget}
            />
        </Canvas>
    )
}

export default SkateLab3DViewport
