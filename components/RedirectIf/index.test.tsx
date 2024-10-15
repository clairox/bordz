import { render } from '@testing-library/react'
import RedirectIf from '.'

const redirect = vi.hoisted(() => vi.fn())
vi.mock('next/navigation', () => ({
    redirect,
}))

describe('RedirectIf component', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('redirects to url prop when condition evaluates to true', () => {
        const { queryByRole } = render(
            <RedirectIf condition={true} url={'/test'}>
                <h1>Child</h1>
            </RedirectIf>
        )

        expect(redirect).toHaveBeenCalledWith('/test')
        expect(queryByRole('heading', { name: 'Child' })).toBeNull()
    })

    it('does not redirect when condition evaluates to false', () => {
        const { getByRole } = render(
            <RedirectIf condition={false} url={'/test'}>
                <h1>Child</h1>
            </RedirectIf>
        )

        expect(redirect).not.toHaveBeenCalled()
        expect(getByRole('heading', { name: 'Child' })).toBeVisible()
    })
})
