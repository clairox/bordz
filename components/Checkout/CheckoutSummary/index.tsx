import Link from 'next/link'

import PriceRepr from '@/components/PriceRepr'

type CheckoutSummaryProps = {
    checkout: Checkout
}

const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({ checkout }) => {
    return (
        <div className="h-screen">
            <div className="sticky top-8 flex flex-col gap-4">
                <div className="flex justify-between">
                    <h2 className="font-semibold text-2xl">Your order</h2>
                    <Link href="/cart" className="hover:underline">
                        Edit
                    </Link>
                </div>
                {checkout.lines.map(line => (
                    <p key={line.id} className="text-lg">
                        {line.quantity} x {line.product?.title}:{' '}
                        <PriceRepr value={line.unitPrice * line.quantity} />
                    </p>
                ))}
                <p>
                    Sales tax: <PriceRepr value={checkout.totalTax} />
                </p>
                <p>
                    Shipping: <PriceRepr value={checkout.totalShipping} />
                </p>
                <p className="font-semibold text-lg">
                    Total: <PriceRepr value={checkout.total} />
                </p>
            </div>
        </div>
    )
}

export default CheckoutSummary
