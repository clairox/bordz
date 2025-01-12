import { ProductList } from '@/components/features/Products'
import SortSelect from '@/components/features/Sorting/SortSelect'
import { Skeleton } from '@/components/ui/Skeleton'
import { Suspense } from 'react'

type BrowsePageProps = {
    searchParams: { size?: string; orderBy?: string; cols?: string }
}

const BrowsePage: React.FC<BrowsePageProps> = ({ searchParams }) => {
    const pageSize = Number(searchParams.size) || 40
    const orderBy = (searchParams.orderBy as SortKey) || 'date-desc'
    const cols = Number(searchParams.cols) || 4

    return (
        <div>
            <h1>Browse Completes</h1>
            <div className="flex justify-end items-center px-4 py-4 w-full border-b border-black">
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
                <ProductList
                    pageSize={pageSize}
                    orderBy={orderBy}
                    cols={cols}
                />
            </Suspense>
        </div>
    )
}

const Fallback = () => (
    <div className="grid grid-cols-4 gap-[1px] w-full bg-black">
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
