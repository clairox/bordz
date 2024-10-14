import { Fragment } from 'react'
import CheckoutForm from './CheckoutForm'
import CheckoutSummary from './CheckoutSummary'

type CheckoutViewProps = {
    checkout: Checkout
}

const CheckoutView: React.FC<CheckoutViewProps> = ({ checkout }) => {
    return (
        <Fragment>
            <div className="mx-auto px-8 max-w-[1000px]">
                <h1 className="mb-5 font-semibold text-3xl">Checkout</h1>
                <div className="grid grid-cols-12 gap-8 w-full">
                    <div className="col-span-7">
                        <CheckoutForm />
                    </div>
                    <div className="col-span-5">
                        <CheckoutSummary checkout={checkout} />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default CheckoutView
