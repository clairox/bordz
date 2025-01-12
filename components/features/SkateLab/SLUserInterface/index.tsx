'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { capitalize } from 'lodash'

import PriceRepr from '@/components/common/PriceRepr'
import { useSkateLabContext } from '../../../../context/SkateLabContext'
import SLButton from './SLButton'
import SLMenu from './SLMenu'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from '@/components/ui/Dialog'
import { Checkbox } from '@/components/ui/Checkbox'
import { Label } from '@/components/ui/Label'
import { Button } from '@/components/ui/Button'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/Sheet'

const SLUserInterface: React.FC = () => {
    const { mode, isComplete, isTouched, finishEditing, reset } =
        useSkateLabContext()

    return (
        <div className="z-10 absolute w-full h-full pointer-events-none">
            <SLMenu />
            <div className="fixed top-24 right-10 flex flex-col gap-4">
                <Sheet>
                    <SheetTrigger>
                        <SLButton disabled={!isComplete} onClick={() => {}}>
                            Done
                        </SLButton>
                    </SheetTrigger>
                    <SheetContent>
                        {mode === 'edit' ? <></> : <SLConfirmation />}
                    </SheetContent>
                </Sheet>
                <SLButton disabled={!isTouched} onClick={reset}>
                    Reset
                </SLButton>
            </div>
        </div>
    )
}

const SLConfirmation: React.FC = () => {
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
            <SheetHeader className="mb-2 text-lg">
                <SheetTitle>Your custom complete</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-3 mb-6">
                <ul className="flex flex-col gap-2">
                    <CompletedBoardDetails
                        componentType="deck"
                        component={selectedComponents.deck!}
                    />
                    <CompletedBoardDetails
                        componentType="trucks"
                        component={selectedComponents.trucks!}
                    />
                    <CompletedBoardDetails
                        componentType="wheels"
                        component={selectedComponents.wheels!}
                    />
                    <CompletedBoardDetails
                        componentType="bearings"
                        component={selectedComponents.bearings!}
                    />
                    <CompletedBoardDetails
                        componentType="hardware"
                        component={selectedComponents.hardware!}
                    />
                    <CompletedBoardDetails
                        componentType="griptape"
                        component={selectedComponents.griptape!}
                    />
                </ul>
                <div className="flex justify-between">
                    <span className="font-semibold text-2xl">
                        {'Subtotal '}
                    </span>
                    <p className="text-xl">
                        <PriceRepr
                            value={Object.values(selectedComponents).reduce(
                                (price, component) => {
                                    return price + component!.price
                                },
                                0
                            )}
                        />
                    </p>
                </div>
            </div>
            <div>
                <div className="flex flex-row gap-4 items-start mb-8">
                    <Checkbox
                        id="shouldPublish"
                        checked={shouldPublish}
                        onCheckedChange={checked =>
                            setShouldPublish(checked ? true : false)
                        }
                    />
                    <Label
                        htmlFor="shouldPublish"
                        className="hover:cursor-pointer"
                    >
                        Would you like to publish your complete?
                    </Label>
                </div>
            </div>
            <div className="flex justify-end gap-4">
                <Button onClick={addToCart}>Add to cart</Button>
                <Button onClick={addToWishlist}>Save for later</Button>
            </div>
        </div>
    )
}

type CompletedBoardDetailsProps = {
    componentType: ComponentType
    component: Component
}

const CompletedBoardDetails: React.FC<CompletedBoardDetailsProps> = ({
    componentType,
    component,
}) => {
    return (
        <li>
            <p className="font-semibold text-lg">{capitalize(componentType)}</p>
            <div className="flex justify-between">
                <p className="w-[600px] line-clamp-2">{component.title}</p>
                <p>
                    <PriceRepr value={component.price} />
                </p>
            </div>
        </li>
    )
}

export { SLUserInterface }
