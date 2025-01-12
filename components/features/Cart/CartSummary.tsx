import PriceRepr from '@/components/common/PriceRepr'
import { CartCheckoutButton } from './CartCheckoutButton'

type CartSummaryProps = {
    cart: Cart
}

export const CartSummary: React.FC<CartSummaryProps> = ({ cart }) => {
    return (
        <div>
            <div className="flex flex-col">
                <div className="flex flex-col">
                    <div className="flex justify-between">
                        <div>Subtotal:</div>
                        <div>
                            <PriceRepr value={cart.subtotal} />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div>Estimated total:</div>
                        <div>
                            <PriceRepr value={cart.total} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end">
                <CartCheckoutButton
                    disabled={!cart.lines || cart.lines.length === 0}
                />
            </div>
        </div>
    )
}
