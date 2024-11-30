'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import fetchAbsolute from '@/lib/fetchAbsolute'
import { useAddCartLineMutation } from '@/hooks'
import SkateLabComponentSelector from '../SkateLabComponentSelector'
import { SkateLabComponentSelectorContext } from '../SkateLabComponentSelector/ComponentSelectorContext'

type SkateLabInterfaceProps = {
    mode: string | null
    productId: string | undefined
    selectedComponents: Record<ComponentType, string | undefined>
    updateSelectedComponents: (
        componentType: ComponentType,
        componentId: string
    ) => void
    activeComponentType: ComponentTypeOrNone
    setActiveComponentType: (componentType: ComponentTypeOrNone) => void
    reset: () => void
    setIsLoading: (value: boolean) => void
}

const SkateLabInterface: React.FC<SkateLabInterfaceProps> = ({
    mode,
    productId,
    selectedComponents,
    updateSelectedComponents,
    activeComponentType,
    setActiveComponentType,
    reset,
    setIsLoading,
}) => {
    const queryClient = useQueryClient()

    const isComplete = !Object.values(selectedComponents).includes(undefined)

    const createProductFromSelectedComponents = async (): Promise<Product> => {
        const { deck, trucks, wheels, bearings, hardware, griptape } =
            selectedComponents

        const res = await fetchAbsolute('/products', {
            method: 'POST',
            body: JSON.stringify({
                type: 'board',
                deckId: deck,
                trucksId: trucks,
                wheelsId: wheels,
                bearingsId: bearings,
                hardwareId: hardware,
                griptapeId: griptape,
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
            try {
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
            } catch (error) {
                throw error
            }
        },
    })

    const onFinish = async () => {
        if (!isComplete) {
            return
        }

        setIsLoading(true)

        if (mode === 'edit') {
            if (!productId) {
                setIsLoading(false)
                return
            }

            await updateBoardSetup({
                id: productId,
                components: selectedComponents as Record<ComponentType, string>,
            })

            queryClient.invalidateQueries({ queryKey: ['cart'] })
        } else {
            const product = await createProductFromSelectedComponents()
            await addCartLine({ productId: product.id })
        }

        setIsLoading(false)
    }

    return (
        <div className="absolute w-full h-full z-10 pointer-events-none">
            <div className="h-full">
                <SkateLabComponentSelectorContext.Provider
                    value={{
                        selectedComponents,
                        activeComponentType,
                        updateSelectedComponents,
                        setActiveComponentType,
                    }}
                >
                    <SkateLabComponentSelector />
                </SkateLabComponentSelectorContext.Provider>

                <div className="fixed right-10 flex flex-col gap-4">
                    <button
                        disabled={!isComplete}
                        onClick={onFinish}
                        className="flex justify-center items-center w-28 h-10 border border-black bg-white pointer-events-auto"
                    >
                        {mode === 'edit' ? 'Done' : 'Add to cart'}
                    </button>
                    <button
                        onClick={reset}
                        className="flex justify-center items-center w-28 h-10 border border-black bg-white pointer-events-auto"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SkateLabInterface
