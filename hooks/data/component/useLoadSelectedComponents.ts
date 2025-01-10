'use client'

import { useSuspenseQuery } from '@tanstack/react-query'

import { mapBoardResponseToBoard } from '@/utils/conversions'
import { fetchCartLine, fetchProduct } from '@/lib/api'

const defaultSelectedComponents = {
    deck: undefined,
    trucks: undefined,
    wheels: undefined,
    bearings: undefined,
    hardware: undefined,
    griptape: undefined,
}

export const useLoadSelectedComponents = (
    mode: SkateLabMode,
    id: string | undefined
) => {
    const getBoardFromCartLine = async (lineId: string): Promise<Board> => {
        const data = await fetchCartLine(lineId)
        if (!data.product.boardSetup) {
            throw new Error('Invalid board setup')
        }

        return mapBoardResponseToBoard(data.product.boardSetup)
    }

    const getBoardFromProduct = async (productId: string) => {
        const data = await fetchProduct(productId)
        if (!data.boardSetup) {
            throw new Error('Invalid board setup')
        }

        return mapBoardResponseToBoard(data.boardSetup)
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
