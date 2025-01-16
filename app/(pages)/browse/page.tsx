import { Suspense } from 'react'

import PageHeading from '@/components/common/PageHeading'
import SortSelect from '@/components/features/Sorting/SortSelect'
import { Skeleton } from '@/components/ui/Skeleton'
import { SortKey } from '@/types/sorting'
import { ProductGridContainer } from '@/components/features/Products'

type BrowsePageProps = {
    searchParams: { orderBy?: string }
}

const BrowsePage: React.FC<BrowsePageProps> = ({ searchParams }) => {
    const orderBy = (searchParams.orderBy as SortKey) || 'date-desc'

    return (
        <div>
            <PageHeading>Browse Completes</PageHeading>
            <div className="flex justify-end items-center px-4 py-4 w-full border-b border-gray-400">
                <SortSelect
                    value={orderBy}
                    availableOptions={[
                        'date-desc',
                        'date-asc',
                        'price-desc',
                        'price-asc',
                    ]}
                />
            </div>
            <Suspense fallback={<Fallback />}>
                <ProductGridContainer />
            </Suspense>
        </div>
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

export default BrowsePage
