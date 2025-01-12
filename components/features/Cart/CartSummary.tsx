import PriceRepr from '@/components/common/PriceRepr'
import { CartCheckoutButton } from './CartCheckoutButton'
import { SHIPPING_COST } from '@/utils/constants'

type CartSummaryProps = {
    cart: Cart
}

export const CartSummary: React.FC<CartSummaryProps> = ({ cart }) => {
    return (
        <div>
            <div className="flex flex-col gap-2 px-4 pt-3 pb-4 border-b border-black">
                <h1 className="mb-1 text-lg">Cart Summary</h1>
                <div className="flex justify-between">
                    <div>Subtotal:</div>
                    <div>
                        <PriceRepr value={cart.subtotal} />
                    </div>
                </div>
                <div className="flex justify-between">
                    <div>Estimated Shipping:</div>
                    <div>
                        <PriceRepr value={SHIPPING_COST} />
                    </div>
                </div>
                <div className="flex justify-between">
                    <div>Estimated Tax:</div>
                    <div>
                        <PriceRepr value={0} />
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-between p-4">
                <div className="flex justify-between mb-10 font-semibold text-xl">
                    <div>Total:</div>
                    <div>
                        <PriceRepr value={cart.total + SHIPPING_COST} />
                    </div>
                </div>
                <CartCheckoutButton
                    disabled={!cart.lines || cart.lines.length === 0}
                />
            </div>
        </div>
    )
}
