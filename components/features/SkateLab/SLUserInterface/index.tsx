'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { capitalize } from 'lodash'

import PriceRepr from '@/components/common/PriceRepr'
import { useSkateLabContext } from '@/context/SkateLabContext'
import SLButton from './SLButton'
import SLMenu from './SLMenu'
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
import { Warning } from '@phosphor-icons/react'

const SLUserInterface: React.FC = () => {
    const { mode, isComplete, isTouched, finishEditing, reset } =
        useSkateLabContext()

    return (
        <div className="z-10 absolute w-full h-full pointer-events-none">
            <SLMenu />
            <div className="fixed top-24 right-10 flex flex-col gap-4 w-32">
                <Sheet>
                    <SheetTrigger asChild>
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
                {!isComplete && <UnavailableComponentsList />}
            </div>
        </div>
    )
}

const UnavailableComponentsList = () => {
    const { selectedBoardComponents } = useSkateLabContext()
    const components = Object.values(selectedBoardComponents)
    const unavailableComponents = components.filter(component => {
        if (component && !component.availableForSale) {
            return component
        }
    })

    return (
        <div className="flex flex-col gap-4">
            {unavailableComponents.map(component => (
                <div
                    key={component!.id}
                    className="flex items-center gap-3 w-full text-sm"
                >
                    <Warning size={24} color="red" weight="fill" />
                    <span>{component!.category.label} out of stock</span>
                </div>
            ))}
        </div>
    )
}

const SLConfirmation: React.FC = () => {
    const { selectedBoardComponents, addBoardToCart, addBoardToWishlist } =
        useSkateLabContext()

    const router = useRouter()

    const [shouldPublish, setShouldPublish] = useState(false)

    const addToCart = async () => {
        await addBoardToCart(shouldPublish)
        router.push('/cart')
    }

    const addToWishlist = async () => {
        await addBoardToWishlist(shouldPublish)
        router.push('/wishlist')
    }

    return (
        <div className="w-full h-full">
            <SheetHeader className="mb-2 text-lg">
                <SheetTitle>Your custom complete</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-3 mb-6">
                <ul className="flex flex-col gap-2">
                    <CompletedBoardDetails
                        boardComponentType="deck"
                        boardComponent={selectedBoardComponents.deck!}
                    />
                    <CompletedBoardDetails
                        boardComponentType="trucks"
                        boardComponent={selectedBoardComponents.trucks!}
                    />
                    <CompletedBoardDetails
                        boardComponentType="wheels"
                        boardComponent={selectedBoardComponents.wheels!}
                    />
                    <CompletedBoardDetails
                        boardComponentType="bearings"
                        boardComponent={selectedBoardComponents.bearings!}
                    />
                    <CompletedBoardDetails
                        boardComponentType="hardware"
                        boardComponent={selectedBoardComponents.hardware!}
                    />
                    <CompletedBoardDetails
                        boardComponentType="griptape"
                        boardComponent={selectedBoardComponents.griptape!}
                    />
                </ul>
                <div className="flex justify-between">
                    <span className="font-semibold text-2xl">
                        {'Subtotal '}
                    </span>
                    <p className="text-xl">
                        <PriceRepr
                            value={Object.values(
                                selectedBoardComponents
                            ).reduce((price, boardComponent) => {
                                return price + boardComponent!.price
                            }, 0)}
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
    boardComponentType: BoardComponentType
    boardComponent: BoardComponent
}

const CompletedBoardDetails: React.FC<CompletedBoardDetailsProps> = ({
    boardComponentType,
    boardComponent,
}) => {
    return (
        <li>
            <p className="font-semibold text-lg">
                {capitalize(boardComponentType)}
            </p>
            <div className="flex justify-between">
                <p className="w-[600px] line-clamp-2">{boardComponent.title}</p>
                <p>
                    <PriceRepr value={boardComponent.price} />
                </p>
            </div>
        </li>
    )
}

export { SLUserInterface }
