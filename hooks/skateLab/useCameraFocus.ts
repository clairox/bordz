'use client'

import { RefObject, useEffect, useMemo, useRef, useState } from 'react'
import { Euler, Group, Matrix4, Mesh, Object3D, Vector3 } from 'three'

import { useSkateLabContext } from '@/context/SkateLabContext'

type ComponentFocusData = {
    focusRef: RefObject<Object3D>
    boardRotation: Euler
    cameraOffset: Vector3
    cameraZoom: number
}

export const useCameraFocus = () => {
    const { activeComponentType } = useSkateLabContext()

    const [focusTarget, setFocusTarget] = useState(new Vector3(0))
    const [boardRotation, setBoardRotation] = useState(
        new Euler(Math.PI / -5, 0, 0)
    )
    const [cameraProps, setCameraProps] = useState({
        position: new Vector3(50, 40, 40),
        zoom: 10,
    })

    const boardFocusRef = useRef<Group>(null)
    const deckFocusRef = useRef<Mesh>(null)
    const trucksFocusRef = useRef<Mesh>(null)
    const wheelsFocusRef = useRef<Mesh>(null)
    const bearingsFocusRef = useRef<Mesh>(null)
    const hardwareFocusRef = useRef<Mesh>(null)
    const griptapeFocusRef = useRef<Mesh>(null)

    const componentFoci: Record<ComponentTypeOrNone, ComponentFocusData> =
        useMemo(() => {
            return {
                none: {
                    focusRef: boardFocusRef,
                    boardRotation: new Euler(Math.PI / -5, 0, 0),
                    cameraOffset: new Vector3(50, 40, 40),
                    cameraZoom: 10,
                },
                deck: {
                    focusRef: deckFocusRef,
                    boardRotation: new Euler(0),
                    cameraOffset: new Vector3(0, 0, 100),
                    cameraZoom: 10,
                },
                trucks: {
                    focusRef: trucksFocusRef,
                    boardRotation: new Euler(Math.PI / 2, Math.PI, 0),
                    cameraOffset: new Vector3(0, 0, 100),
                    cameraZoom: 20,
                },
                wheels: {
                    focusRef: wheelsFocusRef,
                    boardRotation: new Euler(Math.PI / -5, 0, 0),
                    cameraOffset: new Vector3(100, 0, 50),
                    cameraZoom: 40,
                },
                bearings: {
                    focusRef: bearingsFocusRef,
                    boardRotation: new Euler(Math.PI / -5, 0, 0),
                    cameraOffset: new Vector3(100, 0, 0),
                    cameraZoom: 90,
                },
                hardware: {
                    focusRef: hardwareFocusRef,
                    boardRotation: new Euler(0),
                    cameraOffset: new Vector3(40, 0, -100),
                    cameraZoom: 20,
                },
                griptape: {
                    focusRef: griptapeFocusRef,
                    boardRotation: new Euler(0),
                    cameraOffset: new Vector3(0, 0, -100),
                    cameraZoom: 10,
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

    return {
        focusTarget,
        boardRotation,
        cameraProps,
        focusRefs: {
            board: boardFocusRef,
            deck: deckFocusRef,
            trucks: trucksFocusRef,
            wheels: wheelsFocusRef,
            bearings: bearingsFocusRef,
            hardware: hardwareFocusRef,
            griptape: griptapeFocusRef,
        },
    }
}
