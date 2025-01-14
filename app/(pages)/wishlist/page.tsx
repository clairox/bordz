import PageHeading from '@/components/common/PageHeading'
import SortSelect from '@/components/features/Sorting/SortSelect'
import { WishlistContainer } from '@/components/features/Wishlist'
import { SortKey } from '@/types/sorting'
import { DEFAULT_SORT_KEY } from '@/utils/constants'

type WishlistPageProps = {
    searchParams: { orderBy?: string }
}

const WishlistPage: React.FC<WishlistPageProps> = ({ searchParams }) => {
    const orderBy = (searchParams.orderBy as SortKey) || DEFAULT_SORT_KEY

    return (
        <div>
            <PageHeading>Wishlist</PageHeading>
            <div className="flex justify-end px-4 py-4 w-full border-b border-black">
                <SortSelect
                    value={orderBy}
                    availableOptions={['date-desc', 'date-asc']}
                />
            </div>
            <WishlistContainer />
        </div>
    )
}

export default WishlistPage
