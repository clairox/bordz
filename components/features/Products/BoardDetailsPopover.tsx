'use client'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/Popover'
import { fetchBoardByProductId } from '@/lib/api'
import { CaretDown } from '@phosphor-icons/react'
import { QueryClient, useQuery } from '@tanstack/react-query'

type BoardDetailsPopoverProps = {
    productId: string
    trigger?: React.ReactNode
}

export const BoardDetailsPopover: React.FC<BoardDetailsPopoverProps> = ({
    productId,
    trigger,
}) => {
    const queryClient = new QueryClient()

    const prefetch = () => {
        queryClient.prefetchQuery({
            queryKey: ['board', productId],
            queryFn: () => fetchBoardByProductId(productId),
            staleTime: 10 * 1000,
        })
    }

    return (
        <Popover>
            <PopoverTrigger onMouseEnter={prefetch}>
                {trigger ? trigger : <CaretDown size={20} weight="light" />}
            </PopoverTrigger>
            <PopoverContent align="end" alignOffset={-15} sideOffset={10}>
                <BoardDetailsPopoverContent productId={productId} />
            </PopoverContent>
        </Popover>
    )
}

type BoardDetailsPopoverContentProps = {
    productId: string
}

const BoardDetailsPopoverContent: React.FC<BoardDetailsPopoverContentProps> = ({
    productId,
}) => {
    const { data, error, isPending } = useQuery<Board>({
        queryKey: ['board', productId],
        queryFn: () => fetchBoardByProductId(productId),
    })

    if (error) {
        throw error
    }

    if (isPending) {
        return <div>Loading...</div>
    }

    return (
        <ul className="flex flex-col gap-2 text-sm">
            <li className="line-clamp-1">{data!.deck.title}</li>
            <li className="line-clamp-1">{data!.trucks.title}</li>
            <li className="line-clamp-1">{data!.wheels.title}</li>
            <li className="line-clamp-1">{data!.bearings.title}</li>
            <li className="line-clamp-1">{data!.hardware.title}</li>
            <li className="line-clamp-1">{data!.griptape.title}</li>
        </ul>
    )
}
