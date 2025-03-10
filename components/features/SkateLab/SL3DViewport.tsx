'use client'

import { Fragment, useEffect, useState } from 'react'
import { Euler, Vector3, Object3D } from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, OrthographicCamera } from '@react-three/drei'

import { SL3DBoardComponent } from './'
import { useSkateLabContext } from '@/context/SkateLabContext'
import { useSupabase } from '@/context/SupabaseContext'
import { useCameraFocus } from '@/hooks/skateLab'

// TODO: Use default objects
const defaultModels = {
    deck: { object: new Object3D() },
    trucks: { object: new Object3D() },
    wheels: { object: new Object3D() },
    bearings: { object: new Object3D() },
    hardware: { object: new Object3D() },
    griptape: { object: new Object3D() },
}

export const SL3DViewport: React.FC = () => {
    const { selectedBoardComponents, setActiveBoardComponentType } =
        useSkateLabContext()

    const { focusTarget, boardRotation, cameraProps, focusRefs } =
        useCameraFocus()

    const [models, setModels] =
        useState<
            Record<BoardComponentType, { object: Object3D; uri?: string }>
        >(defaultModels)

    const supabase = useSupabase()

    useEffect(() => {
        const keys = Object.keys(
            selectedBoardComponents
        ) as BoardComponentType[]

        keys.forEach(key => {
            const boardComponent = selectedBoardComponents[key]

            if (models[key].uri === boardComponent?.model) {
                return
            }

            if (!boardComponent || !boardComponent.model) {
                setModels(prev => {
                    return { ...prev, [key]: defaultModels[key] }
                })
                return
            }

            const {
                data: { publicUrl },
            } = supabase.storage
                .from('models')
                .getPublicUrl(boardComponent.model)

            if (!publicUrl) {
                throw new Error('BoardComponent model not found')
            }

            const fbxLoader = new FBXLoader()
            fbxLoader.load(
                publicUrl,
                fbx => {
                    if (!fbx) {
                        throw new Error(
                            'An error has occurred while loading boardComponent model'
                        )
                    }

                    setModels(prev => {
                        return {
                            ...prev,
                            [key]: { object: fbx, uri: boardComponent.model },
                        }
                    })
                },
                () => {},
                error => {
                    throw new Error((error as Error).message)
                }
            )
        })
    }, [selectedBoardComponents, models, supabase])

    return (
        <Canvas onPointerMissed={() => setActiveBoardComponentType('none')}>
            <OrthographicCamera
                makeDefault
                {...cameraProps}
                near={0.1}
                far={1000}
            />
            <group ref={focusRefs.board} rotation={boardRotation}>
                <SL3DBoardComponent
                    type={'deck'}
                    render={(visible, handleClick) => (
                        <primitive
                            ref={focusRefs.deck}
                            name="Deck"
                            object={models.deck.object}
                            position={new Vector3(0)}
                            rotation={new Euler()}
                            visible={visible}
                            onClick={handleClick}
                        />
                    )}
                />
                <SL3DBoardComponent
                    type={'trucks'}
                    render={(visible, handleClick) => (
                        <Fragment>
                            <primitive
                                ref={focusRefs.trucks}
                                name="FrontTruck"
                                object={models.trucks.object}
                                position={new Vector3(0, 3, 0.8)}
                                rotation={new Euler()}
                                visible={visible}
                                onClick={handleClick}
                            />
                            <primitive
                                name="BackTruck"
                                object={models.trucks.object}
                                position={new Vector3(0, -3, 0.8)}
                                rotation={new Euler()}
                                visible={visible}
                                onClick={handleClick}
                            />
                        </Fragment>
                    )}
                />
                <SL3DBoardComponent
                    type={'wheels'}
                    render={(visible, handleClick) => (
                        <Fragment>
                            <primitive
                                name="FrontLeftWheel"
                                object={models.wheels.object}
                                position={new Vector3(-1.5, 3, 1.2)}
                                rotation={new Euler()}
                                visible={visible}
                                onClick={handleClick}
                            />
                            <primitive
                                ref={focusRefs.wheels}
                                name="FrontRightWheel"
                                object={models.wheels.object}
                                position={new Vector3(1.5, 3, 1.2)}
                                rotation={new Euler()}
                                visible={visible}
                                onClick={handleClick}
                            />
                            <primitive
                                name="BackLeftWheel"
                                object={models.wheels.object}
                                position={new Vector3(-1.5, -3, 1.2)}
                                rotation={new Euler()}
                                visible={visible}
                                onClick={handleClick}
                            />
                            <primitive
                                name="BackRightWheel"
                                object={models.wheels.object}
                                position={new Vector3(1.5, -3, 1.2)}
                                rotation={new Euler()}
                                visible={visible}
                                onClick={handleClick}
                            />
                        </Fragment>
                    )}
                />
                <SL3DBoardComponent
                    type={'bearings'}
                    render={(visible, handleClick) => (
                        <Fragment>
                            <primitive
                                name="FrontLeftBearing"
                                object={models.bearings.object}
                                position={new Vector3(-1.9, 3, 1.2)}
                                rotation={new Euler()}
                                visible={visible}
                                onClick={handleClick}
                            />
                            <primitive
                                ref={focusRefs.bearings}
                                name="FrontRightBearing"
                                object={models.bearings.object}
                                position={new Vector3(1.9, 3, 1.2)}
                                rotation={new Euler()}
                                visible={visible}
                                onClick={handleClick}
                            />
                            <primitive
                                name="BackLeftBearing"
                                object={models.bearings.object}
                                position={new Vector3(-1.9, -3, 1.2)}
                                rotation={new Euler()}
                                visible={visible}
                                onClick={handleClick}
                            />
                            <primitive
                                name="BackRightBearing"
                                object={models.bearings.object}
                                position={new Vector3(1.9, -3, 1.2)}
                                rotation={new Euler()}
                                visible={visible}
                                onClick={handleClick}
                            />
                        </Fragment>
                    )}
                />
                <SL3DBoardComponent
                    type={'hardware'}
                    render={(visible, handleClick) => (
                        <Fragment>
                            <primitive
                                ref={focusRefs.hardware}
                                name="FrontHardware"
                                object={models.hardware.object}
                                position={new Vector3(0, 3, 0)}
                                rotation={new Euler()}
                                visible={visible}
                                onClick={handleClick}
                            />
                            <primitive
                                name="BackHardware"
                                object={models.hardware.object}
                                position={new Vector3(0, -3, 0)}
                                rotation={new Euler()}
                                visible={visible}
                                onClick={handleClick}
                            />
                        </Fragment>
                    )}
                />
                <SL3DBoardComponent
                    type={'griptape'}
                    render={(visible, handleClick) => (
                        <primitive
                            ref={focusRefs.griptape}
                            name="Griptape"
                            object={models.griptape.object}
                            position={new Vector3(0, 0, -0.1)}
                            rotation={new Euler()}
                            visible={visible}
                            onClick={handleClick}
                        />
                    )}
                />
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
