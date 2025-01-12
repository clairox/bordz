import { Cart } from '@/components/features/Cart'

const CartPage: React.FC = () => {
    return (
        <section>
            <div className="flex items-end px-6 pb-1 h-16 border-b border-black">
                <h1 className="text-2xl">Your Cart</h1>
            </div>
            <Cart />
        </section>
    )
}

export default CartPage
