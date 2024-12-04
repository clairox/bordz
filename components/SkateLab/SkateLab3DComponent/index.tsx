'use client'

import React, { Fragment } from 'react'
import { Euler, Mesh, Vector3 } from 'three'

import { useSkateLabContext } from '../SkateLabContext'

type SkateLab3DComponentProps = {
    type: ComponentType
}
const SkateLab3DComponent = React.forwardRef<Mesh, SkateLab3DComponentProps>(
    ({ type }, ref) => {
        const {
            selectedComponents: {
                deck,
                trucks,
                wheels,
                bearings,
                hardware,
                griptape,
            },
            activeComponentType,
            setActiveComponentType,
        } = useSkateLabContext()

        const visible =
            activeComponentType === 'none' || activeComponentType === type

        const handleClick = () => setActiveComponentType(type)

        switch (type) {
            case 'deck':
                return (
                    <primitive
                        ref={ref}
                        name="Deck"
                        object={deck.model}
                        position={new Vector3(0)}
                        rotation={new Euler()}
                        visible={visible}
                        onClick={handleClick}
                    />
                )

            case 'trucks':
                return (
                    <Fragment>
                        <primitive
                            ref={ref}
                            name="FrontTruck"
                            object={trucks.model}
                            position={new Vector3(0, 3, 0.8)}
                            rotation={new Euler()}
                            visible={visible}
                            onClick={handleClick}
                        />
                        <primitive
                            name="BackTruck"
                            object={trucks.model}
                            position={new Vector3(0, -3, 0.8)}
                            rotation={new Euler()}
                            visible={visible}
                            onClick={handleClick}
                        />
                    </Fragment>
                )

            case 'wheels':
                return (
                    <Fragment>
                        <primitive
                            name="FrontLeftWheel"
                            object={wheels.model}
                            position={new Vector3(-1.5, 3, 1.2)}
                            rotation={new Euler()}
                            visible={visible}
                            onClick={handleClick}
                        />
                        <primitive
                            ref={ref}
                            name="FrontRightWheel"
                            object={wheels.model}
                            position={new Vector3(1.5, 3, 1.2)}
                            rotation={new Euler()}
                            visible={visible}
                            onClick={handleClick}
                        />
                        <primitive
                            name="BackLeftWheel"
                            object={wheels.model}
                            position={new Vector3(-1.5, -3, 1.2)}
                            rotation={new Euler()}
                            visible={visible}
                            onClick={handleClick}
                        />
                        <primitive
                            name="BackRightWheel"
                            object={wheels.model}
                            position={new Vector3(1.5, -3, 1.2)}
                            rotation={new Euler()}
                            visible={visible}
                            onClick={handleClick}
                        />
                    </Fragment>
                )

            case 'bearings':
                return (
                    <Fragment>
                        <primitive
                            name="FrontLeftBearing"
                            object={bearings.model}
                            position={new Vector3(-1.9, 3, 1.2)}
                            rotation={new Euler()}
                            visible={visible}
                            onClick={handleClick}
                        />
                        <primitive
                            ref={ref}
                            name="FrontRightBearing"
                            object={bearings.model}
                            position={new Vector3(1.9, 3, 1.2)}
                            rotation={new Euler()}
                            visible={visible}
                            onClick={handleClick}
                        />
                        <primitive
                            name="BackLeftBearing"
                            object={bearings.model}
                            position={new Vector3(-1.9, -3, 1.2)}
                            rotation={new Euler()}
                            visible={visible}
                            onClick={handleClick}
                        />
                        <primitive
                            name="BackRightBearing"
                            object={bearings.model}
                            position={new Vector3(1.9, -3, 1.2)}
                            rotation={new Euler()}
                            visible={visible}
                            onClick={handleClick}
                        />
                    </Fragment>
                )

            case 'hardware':
                return (
                    <Fragment>
                        <primitive
                            ref={ref}
                            name="FrontHardware"
                            object={hardware.model}
                            position={new Vector3(0, 3, 0)}
                            rotation={new Euler()}
                            visible={visible}
                            onClick={handleClick}
                        />
                        <primitive
                            name="BackHardware"
                            object={hardware.model}
                            position={new Vector3(0, -3, 0)}
                            rotation={new Euler()}
                            visible={visible}
                            onClick={handleClick}
                        />
                    </Fragment>
                )

            case 'griptape':
                return (
                    <primitive
                        ref={ref}
                        name="Griptape"
                        object={griptape.model}
                        position={new Vector3(0, 0, -0.1)}
                        rotation={new Euler()}
                        visible={visible}
                        onClick={handleClick}
                    />
                )

            default:
                throw new Error(`Invalid type: ${type}`)
        }
    }
)

SkateLab3DComponent.displayName = 'SkateLab3DComponent'

export default SkateLab3DComponent
