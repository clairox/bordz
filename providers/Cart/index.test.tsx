import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useContext } from 'react'
import { CartContext, CartProvider } from '.'

const useAuth = vi.hoisted(() => vi.fn())
vi.mock('@/app/providers/Auth', () => ({
    useAuth: useAuth.mockReturnValue({ user: null, status: 'success' }),
}))

const globalFetch = vi.hoisted(() => vi.fn())
global.fetch = globalFetch

const localStorageGetItem = vi.hoisted(() =>
    vi.spyOn(Storage.prototype, 'getItem')
)
localStorageGetItem.mockReturnValue(null)

describe('CartProvider', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => {
        const queryClient = new QueryClient()
        return (
            <QueryClientProvider client={queryClient}>
                <CartProvider>{children}</CartProvider>
            </QueryClientProvider>
        )
    }

    beforeEach(() => {
        vi.clearAllMocks()
        vi.spyOn(Storage.prototype, 'setItem').mockImplementationOnce(() => {})
    })

    it('posts new cart when cartId is not found in localStorage and user is logged out', async () => {
        renderHook(() => useContext(CartContext), { wrapper })

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith(
                'http://localhost:3000/api/carts',
                { method: 'POST' }
            )
        })
    })

    it('fetches cart when cartId is found', async () => {
        localStorageGetItem.mockReturnValueOnce('testLocal')

        renderHook(() => useContext(CartContext), { wrapper })

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith(
                'http://localhost:3000/api/carts/testLocal'
            )
        })
    })

    it('fetches cart when user is logged in', async () => {
        useAuth.mockReturnValueOnce({
            user: { id: '1', cartId: 'testUser' },
            status: 'success',
        })

        renderHook(() => useContext(CartContext), { wrapper })

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith(
                'http://localhost:3000/api/carts/testUser'
            )
        })
    })

    it('posts new cart when cartId is invalid', async () => {
        localStorageGetItem.mockReturnValueOnce('test')
        globalFetch.mockRejectedValueOnce(new Response(null, { status: 404 }))

        renderHook(() => useContext(CartContext), { wrapper })

        await waitFor(() => {
            expect(fetch).toHaveBeenNthCalledWith(
                2,
                'http://localhost:3000/api/carts',
                {
                    method: 'POST',
                }
            )
        })
    })
})
