'use client'

import { useState } from 'react'

import SkateLabInterface from './SkateLabInterface'
import SkateLabView from './SkateLabView'
import { useSearchParams } from 'next/navigation'
import { useSuspenseQuery } from '@tanstack/react-query'
import fetchAbsolute from '@/lib/fetchAbsolute'
import { BoardSetupRecord } from '@/types/records'

type BoardSetup = Record<'productId' | ComponentType, string | undefined>

const SkateLabContainer = () => {
    const searchParams = useSearchParams()
    const mode = searchParams.get('mode')

    const {
        data: { productId, ...defaultBoardSetup },
    } = useSuspenseQuery<BoardSetup>({
        queryKey: ['boardSetup'],
        queryFn: async () => {
            if (mode !== 'edit' && mode !== 'customize') {
                return {
                    productId: undefined,
                    deck: undefined,
                    trucks: undefined,
                    wheels: undefined,
                    bearings: undefined,
                    hardware: undefined,
                    griptape: undefined,
                }
            }

            const convertDBSetupToLocalSetup = (
                setup: BoardSetupRecord
            ): BoardSetup => {
                const {
                    productId,
                    deckId,
                    trucksId,
                    wheelsId,
                    bearingsId,
                    hardwareId,
                    griptapeId,
                } = setup

                return {
                    productId,
                    deck: deckId,
                    trucks: trucksId,
                    wheels: wheelsId,
                    bearings: bearingsId,
                    hardware: hardwareId,
                    griptape: griptapeId,
                }
            }

            try {
                if (mode === 'edit') {
                    const cartLineId = searchParams.get('id')
                    const res = await fetchAbsolute(`/cart/lines/${cartLineId}`)

                    if (!res.ok) {
                        throw res
                    }
                    const cartLine = await res.json()
                    return convertDBSetupToLocalSetup(
                        cartLine.product.boardSetup
                    )
                } else {
                    const productId = searchParams.get('id')
                    const res = await fetchAbsolute(`/products/${productId}`)

                    if (!res.ok) {
                        throw res
                    }

                    const product = await res.json()
                    return convertDBSetupToLocalSetup(product.boardSetup)
                }
            } catch (error) {
                throw error
            }
        },
    })

    const [isLoading, setIsLoading] = useState(true)

    const [selectedComponents, setSelectedComponents] =
        useState(defaultBoardSetup)
    const [activeComponentType, setActiveComponentType] =
        useState<ComponentTypeOrNone>('none')

    const updateSelectedComponents = (component: ComponentType, id: string) => {
        setSelectedComponents(prev => {
            const updatedSetup = { ...prev }
            updatedSetup[component] = id

            return updatedSetup
        })
    }

    return (
        <div className="relative w-full h-[800px]">
            {isLoading && (
                <div className="fixed flex justify-center items-center w-full h-screen bg-white opacity-60 z-50">
                    Loading...
                </div>
            )}
            <SkateLabInterface
                mode={mode}
                productId={productId}
                selectedComponents={selectedComponents}
                activeComponentType={activeComponentType}
                updateSelectedComponents={updateSelectedComponents}
                setActiveComponentType={setActiveComponentType}
                reset={() => setSelectedComponents(defaultBoardSetup)}
                setIsLoading={value => setIsLoading(value)}
            />
            <SkateLabView
                selectedComponents={selectedComponents}
                componentToFocus={activeComponentType}
                setComponentToFocus={setActiveComponentType}
                setIsLoading={value => setIsLoading(value)}
            />
        </div>
    )
}

export default SkateLabContainer
