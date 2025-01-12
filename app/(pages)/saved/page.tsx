import SortSelect from '@/components/features/Sorting/SortSelect'
import { Wishlist } from '@/components/features/Wishlist'

type SavedItemsPageProps = {
    searchParams: { size?: string; orderBy?: string; cols?: string }
}

const SavedItemsPage: React.FC<SavedItemsPageProps> = ({ searchParams }) => {
    const pageSize = Number(searchParams.size) || 40
    const orderBy = (searchParams.orderBy as SortKey) || 'date-desc'
    const cols = Number(searchParams.cols) || 4

    return (
        <div>
            <h1>Saved Items</h1>
            <div className="flex justify-end px-4 py-4 w-full border-b border-black">
                <SortSelect
                    value={orderBy}
                    availableOptions={['date-desc', 'date-asc']}
                />
            </div>
            <Wishlist pageSize={pageSize} orderBy={orderBy} cols={cols} />
        </div>
    )
}

export default SavedItemsPage
