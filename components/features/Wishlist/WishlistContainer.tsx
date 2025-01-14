'use client'

import { useSearchParams } from 'next/navigation'

import InfiniteList from '@/components/common/InfiniteList'
import { Skeleton } from '@/components/ui/Skeleton'
import { useWishlistLines } from '@/hooks/data/wishlist'
import { SortKey } from '@/types/sorting'
import { DEFAULT_PAGE_SIZE, DEFAULT_SORT_KEY } from '@/utils/constants'
import { WishlistGrid } from './WishlistGrid'

export const WishlistContainer = () => {
    const searchParams = useSearchParams()
    const pageSize = Number(searchParams.get('size') ?? DEFAULT_PAGE_SIZE)
    const orderBy = (searchParams.get('orderBy') as SortKey) ?? DEFAULT_SORT_KEY
    const columnCount = Number(searchParams.get('cols') ?? 4)

    const { data, error, isPending, hasNextPage, fetchNextPage } =
        useWishlistLines({
            size: pageSize,
            orderBy,
        })

    if (error) {
        throw error
    }

    if (isPending) {
        return <Fallback />
    }

    return (
        <InfiniteList
            pages={data.pages}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            render={items => {
                if (items.length > 0) {
                    return (
                        <WishlistGrid items={items} columnCount={columnCount} />
                    )
                } else {
                    return (
                        <div className="flex justify-center items-center w-full h-[300px]">
                            <p>Your wishlist is empty.</p>
                        </div>
                    )
                }
            }}
        />
    )
}

const Fallback = () => (
    <div className="grid grid-cols-4 gap-[1px] w-full bg-gray-400">
        {Array(8)
            .fill('x')
            .map((_, idx) => (
                <div key={idx} className="h-[448px] bg-white">
                    <Skeleton className="w-full h-80 rounded-none border-b border-gray-400" />
                    <div className="w-full h-full px-6 pt-5 pb-5">
                        <Skeleton className="w-[160px] h-[24px] mb-4" />
                        <Skeleton className="w-[60px] h-[18px] mb-2" />
                        <Skeleton className="w-[90px] h-[18px]" />
                    </div>
                </div>
            ))}
    </div>
)
