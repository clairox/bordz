'use client'

import { useSuspenseQuery } from '@tanstack/react-query'

import { fetchBoardFullByProductId, fetchCartLine } from '@/lib/api'

const defaultSelectedBoardComponents = {
    deck: undefined,
    trucks: undefined,
    wheels: undefined,
    bearings: undefined,
    hardware: undefined,
    griptape: undefined,
}

export const useLoadSelectedBoardComponents = (
    mode: SkateLabMode,
    id: string | undefined
) => {
    const getBoardFromCartLine = async (lineId: string): Promise<BoardFull> => {
        const cartLine = await fetchCartLine(lineId)
        return await fetchBoardFullByProductId(cartLine.productId).catch(() => {
            throw new Error('Invalid board setup')
        })
    }

    const getBoardFromProduct = async (
        productId: string
    ): Promise<BoardFull> => {
        return await fetchBoardFullByProductId(productId).catch(() => {
            throw new Error('Invalid board setup')
        })
    }

    return useSuspenseQuery<
        Record<BoardComponentType, BoardComponent | undefined> & {
            productId?: string
        }
    >({
        queryKey: ['selectedBoardComponents'],
        queryFn: async () => {
            if (mode !== 'edit' && mode !== 'customize') {
                return defaultSelectedBoardComponents
            }

            if (!id) {
                throw new Error('Invalid id param')
            }

            let board: BoardFull
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
