'use client'

import { createContext, useContext, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { useLoadSelectedComponents } from '../hooks'
import { useAddCartLineMutation } from '@/hooks'
import { useMutation } from '@tanstack/react-query'
import fetchAbsolute from '@/lib/fetchAbsolute'
import useAddWishlistLine from '@/hooks/useAddWishlistLine'

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
    finishEditing: () => Promise<void>
    addBoardSetupToCart: (publish?: boolean) => Promise<void>
    addBoardSetupToWishlist: (publish?: boolean) => Promise<void>
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
        data: { productId: associatedProductId, ...board },
    } = useLoadSelectedComponents(mode, id)

    const [loading, setLoading] = useState(true)

    const [selectedComponents, setSelectedComponents] =
        useState<Record<ComponentType, Component | undefined>>(board)
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

    const createProductFromSelectedComponents = async (
        publish?: boolean
    ): Promise<Product> => {
        const { deck, trucks, wheels, bearings, hardware, griptape } =
            selectedComponents

        const res = await fetchAbsolute('/products', {
            method: 'POST',
            body: JSON.stringify({
                type: 'board',
                isPublic: publish,
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
    const { mutateAsync: addWishlistLine } = useAddWishlistLine()

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

    const finishEditing = async () => {
        if (!isComplete) {
            return
        }

        setLoading(true)

        // TODO: implement edit mode logic

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

        setLoading(false)
    }

    const addBoardSetupToCart = async (publish?: boolean) => {
        if (!isComplete) {
            return
        }

        setLoading(true)

        const product = await createProductFromSelectedComponents(publish)
        await addCartLine({ productId: product.id })

        setLoading(false)
    }

    const addBoardSetupToWishlist = async (publish?: boolean) => {
        if (!isComplete) {
            return
        }

        setLoading(true)

        const product = await createProductFromSelectedComponents(publish)
        await addWishlistLine({ productId: product.id })

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
                finishEditing,
                addBoardSetupToCart,
                addBoardSetupToWishlist,
                reset,
            }}
        >
            {children}
        </SkateLabContext.Provider>
    )
}

export { SkateLabContext, SkateLabProvider, useSkateLabContext }
