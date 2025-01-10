import Link from 'next/link'

import PriceRepr from '@/components/common/PriceRepr'

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
                    <div key={line.id}>
                        <div className="text-lg">
                            <span>
                                {line.quantity} x {line.product?.title}:{' '}
                            </span>
                            <PriceRepr value={line.unitPrice * line.quantity} />
                        </div>
                        {line.product?.board && (
                            <ul className="text-base">
                                <li className="line-clamp-1">
                                    {line.product.board.deck.title}
                                </li>
                                <li className="line-clamp-1">
                                    {line.product.board.trucks.title}
                                </li>
                                <li className="line-clamp-1">
                                    {line.product.board.wheels.title}
                                </li>
                                <li className="line-clamp-1">
                                    {line.product.board.bearings.title}
                                </li>
                                <li className="line-clamp-1">
                                    {line.product.board.hardware.title}
                                </li>
                                <li className="line-clamp-1">
                                    {line.product.board.griptape.title}
                                </li>
                            </ul>
                        )}
                    </div>
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
