import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useContext } from 'react'
import { CartContext, CartProvider } from '.'

const useAuth = vi.hoisted(() => vi.fn())
vi.mock('@/providers/Auth', () => ({
    useAuth: useAuth.mockReturnValue({ user: null, status: 'success' }),
}))

const fetchAbsolute = vi.hoisted(() => vi.fn())
vi.mock('@/lib/fetchAbsolute', () => ({
    default: fetchAbsolute,
}))

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
            expect(fetchAbsolute).toHaveBeenCalledWith('/carts', {
                method: 'POST',
            })
        })
    })

    it('fetches cart when cartId is found', async () => {
        localStorageGetItem.mockReturnValueOnce('testLocal')

        renderHook(() => useContext(CartContext), { wrapper })

        await waitFor(() => {
            expect(fetchAbsolute).toHaveBeenCalledWith('/carts/testLocal')
        })
    })

    it('fetches cart when user is logged in', async () => {
        useAuth.mockReturnValueOnce({
            user: { id: '1', cartId: 'testUser' },
            status: 'success',
        })

        renderHook(() => useContext(CartContext), { wrapper })

        await waitFor(() => {
            expect(fetchAbsolute).toHaveBeenCalledWith('/carts/testUser')
        })
    })

    it('posts new cart when cartId is invalid', async () => {
        localStorageGetItem.mockReturnValueOnce('test')
        fetchAbsolute.mockRejectedValueOnce(new Response(null, { status: 404 }))

        renderHook(() => useContext(CartContext), { wrapper })

        await waitFor(() => {
            expect(fetchAbsolute).toHaveBeenNthCalledWith(2, '/carts', {
                method: 'POST',
            })
        })
    })
})
