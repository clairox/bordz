'use client'

import { createContext, useContext, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'

import { useLoadSelectedBoardComponents } from '@/hooks/data/boardComponent'
import { useAddCartLine } from '@/hooks/data/cart'
import { useAddWishlistLine } from '@/hooks/data/wishlist'
import fetchAbsolute from '@/lib/fetchAbsolute'
import { ProductResponse } from '@/types/api'
import { mapProductResponseToProduct } from '@/utils/conversions'
import { createBoard, createProduct, fetchBoardComponent } from '@/lib/api'

type SkateLabContextValue = {
    selectedBoardComponents: Record<
        BoardComponentType,
        BoardComponent | undefined
    >
    associatedProductId: string | undefined
    activeBoardComponentType: BoardComponentTypeOrNone
    mode: SkateLabMode
    isComplete: boolean
    isTouched: boolean
    loading: boolean
    selectBoardComponent: (
        type: BoardComponentType,
        boardComponent: BoardComponent
    ) => void
    setActiveBoardComponentType: (type: BoardComponentTypeOrNone) => void
    finishEditing: () => Promise<void>
    addBoardToCart: (publish?: boolean) => Promise<void>
    addBoardToWishlist: (publish?: boolean) => Promise<void>
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
    } = useLoadSelectedBoardComponents(mode, id)

    const [loading, setLoading] = useState(true)

    const [selectedBoardComponents, setSelectedBoardComponents] =
        useState<Record<BoardComponentType, BoardComponent | undefined>>(board)
    const [activeBoardComponentType, setActiveBoardComponentType] =
        useState<BoardComponentTypeOrNone>('none')

    const isComplete = !Object.values(selectedBoardComponents).includes(
        undefined
    )
    const isTouched = !Object.values(selectedBoardComponents).every(
        boardComponent => boardComponent == undefined
    )

    const selectBoardComponent = (
        type: BoardComponentType,
        boardComponent: BoardComponent
    ) => {
        setSelectedBoardComponents(prev => {
            const updatedSelectedBoardComponents = { ...prev }
            updatedSelectedBoardComponents[type] = boardComponent
            return updatedSelectedBoardComponents
        })
    }

    const createProductFromSelectedBoardComponents = async (
        publish?: boolean
    ): Promise<Product> => {
        const board = selectedBoardComponents
        const components = Object.values(board).filter(value => !!value)
        if (components.length < 6) {
            throw new Error('Missing component')
        }

        const totalPrice = components.reduce((total, c) => total + c.price, 0)
        const availability = components.every(c => c.availableForSale)
        const featuredImage = board.deck!.images[0]

        const { usageCount: deckUsageCount } = await fetchBoardComponent(
            board.deck!.id
        )
        let baseTitle: string = board.deck!.title
        if (baseTitle.toLowerCase().endsWith(' deck')) {
            baseTitle = baseTitle.slice(0, -5)
        }
        const productTitle = `${baseTitle} Complete #${deckUsageCount + 1}`

        const newProduct = await createProduct({
            title: productTitle,
            price: totalPrice,
            type: 'BOARD',
            availableForSale: availability,
            isPublic: publish,
            featuredImage,
        })

        await createBoard({
            productId: newProduct.id,
            deckId: board.deck!.id,
            trucksId: board.trucks!.id,
            wheelsId: board.wheels!.id,
            bearingsId: board.bearings!.id,
            hardwareId: board.hardware!.id,
            griptapeId: board.griptape!.id,
        })

        return newProduct
    }

    const { mutateAsync: addCartLine } = useAddCartLine()
    const { mutateAsync: addWishlistLine } = useAddWishlistLine()

    const { mutateAsync: updateBoard } = useMutation({
        mutationFn: async ({
            id,
            boardComponents,
        }: {
            id: string
            boardComponents: Record<BoardComponentType, string>
        }) => {
            const data = await fetchAbsolute<ProductResponse>(
                `/products/${id}`,
                {
                    method: 'PATCH',
                    body: JSON.stringify({
                        type: 'board',
                        deckId: boardComponents.deck,
                        trucksId: boardComponents.trucks,
                        wheelsId: boardComponents.wheels,
                        bearingsId: boardComponents.bearings,
                        hardwareId: boardComponents.hardware,
                        griptapeId: boardComponents.griptape,
                    }),
                }
            )
            return mapProductResponseToProduct(data)
        },
    })

    const finishEditing = async () => {
        if (!isComplete) {
            return
        }

        setLoading(true)

        // TODO: Implement edit mode logic

        // if (!productId) {
        //     setLoading(false)
        //     return
        // }
        //
        // await updateBoard({
        //     id: productId,
        //     boardComponents: selectedBoardComponents as Record<BoardComponentType, string>,
        // })
        //
        // queryClient.invalidateQueries({ queryKey: ['cart'] })

        setLoading(false)
    }

    const addBoardToCart = async (publish?: boolean) => {
        if (!isComplete) {
            return
        }

        setLoading(true)

        const product = await createProductFromSelectedBoardComponents(publish)
        await addCartLine({ productId: product.id })

        setLoading(false)
    }

    const addBoardToWishlist = async (publish?: boolean) => {
        if (!isComplete) {
            return
        }

        setLoading(true)

        const product = await createProductFromSelectedBoardComponents(publish)
        await addWishlistLine({ productId: product.id })

        setLoading(false)
    }

    const reset = () => {
        setSelectedBoardComponents({
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
                selectedBoardComponents,
                associatedProductId,
                activeBoardComponentType,
                mode,
                isComplete,
                isTouched,
                loading,
                selectBoardComponent,
                setActiveBoardComponentType,
                finishEditing,
                addBoardToCart,
                addBoardToWishlist,
                reset,
            }}
        >
            {children}
        </SkateLabContext.Provider>
    )
}

export { SkateLabContext, SkateLabProvider, useSkateLabContext }
