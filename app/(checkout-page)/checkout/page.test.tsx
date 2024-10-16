import { render } from '@testing-library/react'

import CheckoutPage from './page'

vi.mock('@/components/Checkout/ProcessCheckoutCompletion', () => ({
    default: vi.fn().mockReturnValue(<h1>ProcessCheckoutCompletion</h1>),
}))

vi.mock('@/components/Checkout', () => ({
    default: vi.fn().mockReturnValue(<h1>Checkout</h1>),
}))

const useSearchParams = vi.hoisted(() => vi.fn())
const redirect = vi.hoisted(() => vi.fn())
const useCartQuery = vi.hoisted(() => vi.fn())

vi.mock('next/navigation', () => ({
    useSearchParams,
    redirect,
}))

vi.mock('@/context/cartContext', () => ({
    useCartQuery,
}))

describe('Checkout page', () => {
    beforeEach(() => {
        vi.clearAllMocks()

        useSearchParams.mockReturnValue(new URLSearchParams())
    })
    describe('when cart is empty', () => {
        beforeEach(() => {
            useCartQuery.mockReturnValue({ data: { lines: [] } })
        })
        it('redirects to /cart', () => {
            render(<CheckoutPage />)

            expect(redirect).toHaveBeenCalledWith('/cart')
        })
    })

    describe('when cart is not empty', () => {
        beforeEach(() => {
            useCartQuery.mockReturnValue({ data: { lines: [1] } })
        })

        it('does not redirect', () => {
            useCartQuery.mockReturnValue({ data: { lines: [1] } })
            render(<CheckoutPage />)

            expect(redirect).not.toHaveBeenCalled()
        })

        it('renders ProcessCheckoutCompletion component if payment_intent_client_secret is in url query', () => {
            useSearchParams.mockReturnValue(
                new URLSearchParams([
                    ['payment_intent_client_secret', 'secret'],
                ])
            )
            const { getByRole } = render(<CheckoutPage />)

            expect(
                getByRole('heading', {
                    level: 1,
                    name: 'ProcessCheckoutCompletion',
                })
            ).toBeVisible()
        })

        it('renders Checkout component if payment_intent_client_secret is not in url query', () => {
            const { getByRole } = render(<CheckoutPage />)

            expect(
                getByRole('heading', {
                    level: 1,
                    name: 'Checkout',
                })
            ).toBeVisible()
        })
    })
})
