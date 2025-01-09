'use client'

import { useSuspenseQuery } from '@tanstack/react-query'

import fetchAbsolute from '@/lib/fetchAbsolute'
import { CartLineResponse, ProductResponse } from '@/types/api'
import boardResponseToBoard from '@/utils/helpers/boardResponseToBoard'

const defaultSelectedComponents = {
    deck: undefined,
    trucks: undefined,
    wheels: undefined,
    bearings: undefined,
    hardware: undefined,
    griptape: undefined,
}

const useLoadSelectedComponents = (
    mode: SkateLabMode,
    id: string | undefined
) => {
    const getBoardFromCartLine = async (cartLineId: string): Promise<Board> => {
        const data = await fetchAbsolute<CartLineResponse>(
            `/cart/lines/${cartLineId}`
        )
        if (!data.product.boardSetup) {
            throw new Error('Invalid board setup')
        }

        return boardResponseToBoard(data.product.boardSetup)
    }

    const getBoardFromProduct = async (productId: string) => {
        const data = await fetchAbsolute<ProductResponse>(
            `/products/${productId}`
        )
        if (!data.boardSetup) {
            throw new Error('Invalid board setup')
        }

        return boardResponseToBoard(data.boardSetup)
    }

    return useSuspenseQuery<
        Record<ComponentType, Component | undefined> & {
            productId?: string
        }
    >({
        queryKey: ['selectedComponents'],
        queryFn: async () => {
            if (mode !== 'edit' && mode !== 'customize') {
                return defaultSelectedComponents
            }

            if (!id) {
                throw new Error('Invalid id param')
            }

            let board: Board
            if (mode === 'edit') {
                board = await getBoardFromCartLine(id)
            } else {
                board = await getBoardFromProduct(id)
            }

            const {
                productId,
                deck,
                trucks,
                wheels,
                bearings,
                hardware,
                griptape,
            } = board

            return {
                productId,
                deck,
                trucks,
                wheels,
                bearings,
                hardware,
                griptape,
            }
        },
    })
}

export default useLoadSelectedComponents
