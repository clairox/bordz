import fetchAbsolute from '@/lib/fetchAbsolute'
import { BoardSetupRecord } from '@/types/records'
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
    const getBoardSetupFromCartLine = async (cartLineId: string) => {
        const response = await fetchAbsolute(`/cart/lines/${cartLineId}`)
        if (!response.ok) {
            throw response
        }
        const cartLine = await response.json()
        return cartLine.product.boardSetup
    }

    const getBoardSetupFromProduct = async (productId: string) => {
        const response = await fetchAbsolute(`/products/${productId}`)
        if (!response.ok) {
            throw response
        }
        const product = await response.json()
        return product.boardSetup
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

            let boardSetup: BoardSetupRecord & BoardSetup
            if (mode === 'edit') {
                boardSetup = await getBoardSetupFromCartLine(id)
            } else {
                boardSetup = await getBoardSetupFromProduct(id)
            }

            const {
                productId,
                deck,
                trucks,
                wheels,
                bearings,
                hardware,
                griptape,
            } = boardSetup

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
