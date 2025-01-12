'use client'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/Popover'
import { CaretDown } from '@phosphor-icons/react'

type ProductBoardPopoverProps = {
    board: Board
}

export const ProductBoardPopover: React.FC<ProductBoardPopoverProps> = ({
    board,
}) => {
    return (
        <Popover>
            <PopoverTrigger>
                <CaretDown size={20} weight="light" />
            </PopoverTrigger>
            <PopoverContent align="end" alignOffset={-15} sideOffset={10}>
                <ul className="flex flex-col gap-2 text-sm">
                    <li className="line-clamp-1">{board.deck.title}</li>
                    <li className="line-clamp-1">{board.trucks.title}</li>
                    <li className="line-clamp-1">{board.wheels.title}</li>
                    <li className="line-clamp-1">{board.bearings.title}</li>
                    <li className="line-clamp-1">{board.hardware.title}</li>
                    <li className="line-clamp-1">{board.griptape.title}</li>
                </ul>
            </PopoverContent>
        </Popover>
    )
}
