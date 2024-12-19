import { usePathname, useRouter } from 'next/navigation'

type SortSelectProps = {
    value: SortKey
    availableOptions: SortKey[]
}

const SortSelect: React.FC<SortSelectProps> = ({ value, availableOptions }) => {
    const router = useRouter()
    const pathname = usePathname()

    const sort: Partial<Record<SortKey, string>> = {
        'date-desc': 'Newest',
        'date-asc': 'Oldest',
        'price-asc': 'Price (low to high)',
        'price-desc': 'Price (high to low)',
    }

    // TODO: Be aware of existing search params
    return (
        <select
            id="sortSelect"
            value={value}
            onChange={e => router.push(pathname + `?orderBy=${e.target.value}`)}
        >
            {availableOptions.map(opt => {
                return (
                    <option value={opt} key={opt}>
                        {sort[opt]}
                    </option>
                )
            })}
        </select>
    )
}

export default SortSelect
