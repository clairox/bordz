'use client'

import fetchAbsolute from '@/lib/fetchAbsolute'
import { useAddCartLineMutation } from '@/hooks'
import SkateLabComponentSelector from '../SkateLabComponentSelector'
import { SkateLabComponentSelectorContext } from '../SkateLabComponentSelector/ComponentSelectorContext'

type SkateLabInterfaceProps = {
    selectedComponents: Record<ComponentType, string | undefined>
    isComplete: boolean
    updateSelectedComponents: (
        componentType: ComponentType,
        componentId: string
    ) => void
    activeComponentType: ComponentTypeOrNone
    setActiveComponentType: (componentType: ComponentTypeOrNone) => void
    reset: () => void
}

const SkateLabInterface: React.FC<SkateLabInterfaceProps> = ({
    selectedComponents,
    isComplete,
    updateSelectedComponents,
    activeComponentType,
    setActiveComponentType,
    reset,
}) => {
    const createProductFromSelectedComponents = async (): Promise<Product> => {
        const { deck, trucks, wheels, bearings, hardware, griptape } =
            selectedComponents

        const res = await fetchAbsolute('/products', {
            method: 'POST',
            body: JSON.stringify({
                isBoard: true,
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

    const { mutate: addCartLine } = useAddCartLineMutation()

    const handleAddToCartButtonClick = async () => {
        const product = await createProductFromSelectedComponents()
        addCartLine({ productId: product.id })
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
                        onClick={handleAddToCartButtonClick}
                        className="flex justify-center items-center w-28 h-10 border border-black bg-white pointer-events-auto"
                    >
                        Add to cart
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
