import { Fragment } from 'react'

type PriceReprProps = {
    value: number
    isPreSalePrice?: boolean
}

const PriceRepr: React.FC<PriceReprProps> = ({
    value,
    isPreSalePrice = false,
}) => {
    const price = '$' + (value * 0.01).toFixed(2)

    if (isPreSalePrice) {
        return (
            <Fragment>
                <span className="line-through">{price}</span>
            </Fragment>
        )
    }

    return <Fragment>{price}</Fragment>
}

export default PriceRepr
