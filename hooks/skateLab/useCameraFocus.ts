'use client'

import { RefObject, useEffect, useMemo, useRef, useState } from 'react'
import { Euler, Group, Matrix4, Mesh, Object3D, Vector3 } from 'three'

import { useSkateLabContext } from '@/context/SkateLabContext'

type BoardComponentFocusData = {
    focusRef: RefObject<Object3D>
    boardRotation: Euler
    cameraOffset: Vector3
    cameraZoom: number
}

export const useCameraFocus = () => {
    const { activeBoardComponentType } = useSkateLabContext()

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

    const boardComponentFoci: Record<
        BoardComponentTypeOrNone,
        BoardComponentFocusData
    > = useMemo(() => {
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
            focusRef: { current: targetBoardComponent },
            boardRotation,
            cameraOffset,
            cameraZoom,
        } = boardComponentFoci[activeBoardComponentType]

        if (!targetBoardComponent) {
            return
        }

        if (!boardFocusRef.current) {
            return
        }

        const targetBoardComponentPosition = new Vector3()
        targetBoardComponent.getWorldPosition(targetBoardComponentPosition)
        boardFocusRef.current.worldToLocal(targetBoardComponentPosition)

        const rotationMatrix = new Matrix4()
        rotationMatrix.makeRotationFromEuler(boardRotation)

        targetBoardComponentPosition.applyMatrix4(rotationMatrix)

        const cameraPosition = new Vector3().addVectors(
            targetBoardComponentPosition,
            cameraOffset
        )

        setFocusTarget(targetBoardComponentPosition)
        setCameraProps({ position: cameraPosition, zoom: cameraZoom })
        setBoardRotation(boardRotation)
    }, [boardComponentFoci, activeBoardComponentType])

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
