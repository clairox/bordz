import { render } from '@testing-library/react'

import PriceRepr from '.'

describe('PriceRepr component', () => {
    it('renders price in USD format', () => {
        const { getByText } = render(<PriceRepr value={8457} />)

        expect(getByText('$84.57')).toBeVisible()
    })

    it('renders price with line through if it is a pre-sale price', () => {
        const { getByText } = render(
            <PriceRepr value={324} isPreSalePrice={true} />
        )

        expect(getByText('$3.24')).toHaveClass('line-through')
    })
})
