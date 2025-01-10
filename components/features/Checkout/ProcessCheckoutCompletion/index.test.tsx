import { render, waitFor } from '@testing-library/react'

import { ProcessCheckoutCompletion } from '.'

const replace = vi.hoisted(() => vi.fn())
vi.mock('next/navigation', () => ({
    useRouter: vi.fn().mockReturnValue({ replace }),
}))

vi.mock('@/lib/fetchAbsolute', () => ({
    default: vi
        .fn()
        .mockResolvedValue(
            Response.json({ orderId: 'test123' }, { status: 200 })
        ),
}))

describe('ProcessCheckoutCompletion component', () => {
    it('redirects to order confirmation page when checkout is complete', async () => {
        render(<ProcessCheckoutCompletion />)

        await waitFor(() => {
            expect(replace).toHaveBeenCalledWith(
                '/order/confirmation?order=test123'
            )
        })
    })
})
