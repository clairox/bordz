'use client'

import { createContext, useContext, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { useLoadSelectedComponents } from '../hooks'
import { useAddCartLineMutation } from '@/hooks'
import { useMutation } from '@tanstack/react-query'
import fetchAbsolute from '@/lib/fetchAbsolute'

type SkateLabContextValue = {
    selectedComponents: Record<ComponentType, Component | undefined>
    associatedProductId: string | undefined
    activeComponentType: ComponentTypeOrNone
    mode: SkateLabMode
    isComplete: boolean
    isTouched: boolean
    loading: boolean
    selectComponent: (type: ComponentType, component: Component) => void
    setActiveComponentType: (type: ComponentTypeOrNone) => void
    handleSetupCompletion: () => Promise<void>
    reset: () => void
}

const SkateLabContext = createContext<SkateLabContextValue>(
    {} as SkateLabContextValue
)

const useSkateLabContext = () => useContext(SkateLabContext)

type SkateLabProviderProps = React.PropsWithChildren

const SkateLabProvider: React.FC<SkateLabProviderProps> = ({ children }) => {
    const searchParams = useSearchParams()
    const mode = (searchParams.get('mode') ?? 'default') as SkateLabMode
    const id = searchParams.get('id') ?? undefined

    const {
        data: { productId: associatedProductId, ...boardSetup },
    } = useLoadSelectedComponents(mode, id)

    const [loading, setLoading] = useState(true)

    const [selectedComponents, setSelectedComponents] =
        useState<Record<ComponentType, Component | undefined>>(boardSetup)
    const [activeComponentType, setActiveComponentType] =
        useState<ComponentTypeOrNone>('none')

    const isComplete = !Object.values(selectedComponents).includes(undefined)
    const isTouched = !Object.values(selectedComponents).every(
        component => component == undefined
    )

    const selectComponent = (type: ComponentType, component: Component) => {
        setSelectedComponents(prev => {
            const updatedSelectedComponents = { ...prev }
            updatedSelectedComponents[type] = component
            return updatedSelectedComponents
        })
    }

    const createProductFromSelectedComponents = async (): Promise<Product> => {
        const { deck, trucks, wheels, bearings, hardware, griptape } =
            selectedComponents

        const res = await fetchAbsolute('/products', {
            method: 'POST',
            body: JSON.stringify({
                type: 'board',
                deckId: deck?.id,
                trucksId: trucks?.id,
                wheelsId: wheels?.id,
                bearingsId: bearings?.id,
                hardwareId: hardware?.id,
                griptapeId: griptape?.id,
            }),
        })
        if (!res.ok) {
            throw res
        }
        return await res.json()
    }

    const { mutateAsync: addCartLine } = useAddCartLineMutation()

    const { mutateAsync: updateBoardSetup } = useMutation({
        mutationFn: async ({
            id,
            components,
        }: {
            id: string
            components: Record<ComponentType, string>
        }) => {
            const res = await fetchAbsolute(`/products/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    type: 'board',
                    deckId: components.deck,
                    trucksId: components.trucks,
                    wheelsId: components.wheels,
                    bearingsId: components.bearings,
                    hardwareId: components.hardware,
                    griptapeId: components.griptape,
                }),
            })
            if (!res.ok) {
                throw res
            }
            return await res.json()
        },
    })

    const handleSetupCompletion = async () => {
        if (!isComplete) {
            return
        }

        setLoading(true)

        // TODO: Implement edit mode logic
        if (mode === 'edit') {
            // if (!productId) {
            //     setLoading(false)
            //     return
            // }
            //
            // await updateBoardSetup({
            //     id: productId,
            //     components: selectedComponents as Record<ComponentType, string>,
            // })
            //
            // queryClient.invalidateQueries({ queryKey: ['cart'] })
        } else {
            const product = await createProductFromSelectedComponents()
            await addCartLine({ productId: product.id })
        }

        setLoading(false)
    }

    const reset = () => {
        setSelectedComponents({
            deck: undefined,
            trucks: undefined,
            wheels: undefined,
            bearings: undefined,
            hardware: undefined,
            griptape: undefined,
        })
    }

    return (
        <SkateLabContext.Provider
            value={{
                selectedComponents,
                associatedProductId,
                activeComponentType,
                mode,
                isComplete,
                isTouched,
                loading,
                selectComponent,
                setActiveComponentType,
                handleSetupCompletion,
                reset,
            }}
        >
            {children}
        </SkateLabContext.Provider>
    )
}

export { SkateLabContext, SkateLabProvider, useSkateLabContext }
