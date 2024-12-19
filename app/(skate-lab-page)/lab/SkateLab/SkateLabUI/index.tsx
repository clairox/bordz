'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import PriceRepr from '@/components/PriceRepr'
import { useSkateLabContext } from '../SkateLabContext'
import SkateLabUIButton from './SkateLabUIButton'
import SkateLabUIMenu from './SkateLabUIMenu'

const SkateLabUI: React.FC = () => {
    const { mode, isComplete, isTouched, finishEditing, reset } =
        useSkateLabContext()

    const [confirm, setConfirm] = useState(false)

    if (confirm) {
        return <SkateLabUIConfirmation />
    }

    return (
        <div className="z-10 absolute w-full h-full pointer-events-none">
            <SkateLabUIMenu />
            <div className="fixed top-24 right-10 flex flex-col gap-4">
                <SkateLabUIButton
                    disabled={!isComplete}
                    onClick={() => {
                        if (mode === 'edit') {
                            finishEditing()
                        } else {
                            setConfirm(true)
                        }
                    }}
                >
                    Done
                </SkateLabUIButton>
                <SkateLabUIButton disabled={!isTouched} onClick={reset}>
                    Reset
                </SkateLabUIButton>
            </div>
        </div>
    )
}

const SkateLabUIConfirmation: React.FC = () => {
    const { selectedComponents, addBoardSetupToCart, addBoardSetupToWishlist } =
        useSkateLabContext()

    const router = useRouter()

    const [shouldPublish, setShouldPublish] = useState(false)

    const addToCart = async () => {
        await addBoardSetupToCart(shouldPublish)
        router.push('/cart')
    }

    const addToWishlist = async () => {
        await addBoardSetupToWishlist(shouldPublish)
        router.push('/saved')
    }

    return (
        <div className="w-full h-full">
            <h2 className="text-lg">Your custom complete</h2>
            <ul>
                <li className="flex">
                    <div>
                        <span className="font-semibold">{'Deck: '}</span>
                        {selectedComponents.deck!.title}
                    </div>
                    <div>
                        <PriceRepr value={selectedComponents.deck!.price} />
                    </div>
                </li>
                <li className="flex">
                    <div>
                        <span className="font-semibold">{'Trucks: '}</span>
                        {selectedComponents.trucks!.title}
                    </div>
                    <div>
                        <PriceRepr value={selectedComponents.trucks!.price} />
                    </div>
                </li>
                <li className="flex">
                    <div>
                        <span className="font-semibold">{'Wheels: '}</span>
                        {selectedComponents.wheels!.title}
                    </div>
                    <div>
                        <PriceRepr value={selectedComponents.wheels!.price} />
                    </div>
                </li>
                <li className="flex">
                    <div>
                        <span className="font-semibold">{'Bearings: '}</span>
                        {selectedComponents.bearings!.title}
                    </div>
                    <div>
                        <PriceRepr value={selectedComponents.bearings!.price} />
                    </div>
                </li>
                <li className="flex">
                    <div>
                        <span className="font-semibold">{'Hardware: '}</span>
                        {selectedComponents.hardware!.title}
                    </div>
                    <div>
                        <PriceRepr value={selectedComponents.hardware!.price} />
                    </div>
                </li>
                <li className="flex">
                    <div>
                        <span className="font-semibold">{'Griptape: '}</span>
                        {selectedComponents.griptape!.title}
                    </div>
                    <div>
                        <PriceRepr value={selectedComponents.griptape!.price} />
                    </div>
                </li>
            </ul>
            <div>
                <span className="font-semibold">{'Subtotal: '}</span>
                <PriceRepr
                    value={Object.values(selectedComponents).reduce(
                        (price, component) => {
                            return price + component!.price
                        },
                        0
                    )}
                />
            </div>
            <div>
                <input
                    id="shouldPublish"
                    type="checkbox"
                    checked={shouldPublish}
                    onChange={e => setShouldPublish(e.target.checked)}
                />
                <label htmlFor="shouldPublish">
                    Would you like to publish your complete?
                </label>
            </div>
            <button onClick={addToCart}>Add to cart</button>
            <button onClick={addToWishlist}>Save for later</button>
        </div>
    )
}

export default SkateLabUI
