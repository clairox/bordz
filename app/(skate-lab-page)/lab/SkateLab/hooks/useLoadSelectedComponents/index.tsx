'use client'

import fetchAbsolute from '@/lib/fetchAbsolute'
import { CartLineResponse, CartResponse, ProductResponse } from '@/types/api'
import { BoardSetupRecord } from '@/types/database'
import { CartLineQueryResult } from '@/types/queries'
import boardResponseToBoard from '@/utils/helpers/boardResponseToBoard'
import { useSuspenseQuery } from '@tanstack/react-query'

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
        const response = await fetchAbsolute(`/cart/lines/${cartLineId}`)
        if (!response.ok) {
            throw response
        }
        const cartLine = (await response.json()) as CartLineResponse
        if (!cartLine.product.boardSetup) {
            throw new Error('Invalid board setup')
        }

        return boardResponseToBoard(cartLine.product.boardSetup)
    }

    const getBoardFromProduct = async (productId: string) => {
        const response = await fetchAbsolute(`/products/${productId}`)
        if (!response.ok) {
            throw response
        }
        const product = (await response.json()) as ProductResponse
        if (!product.boardSetup) {
            throw new Error('Invalid board setup')
        }

        return boardResponseToBoard(product.boardSetup)
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
