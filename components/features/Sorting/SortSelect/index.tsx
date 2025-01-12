'use client'

import { usePathname, useRouter } from 'next/navigation'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/Select'

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

    const handleValueChange = (value: SortKey) => {
        router.push(pathname + `?orderBy=${value}`)
    }

    // TODO: Be aware of existing search params
    return (
        <Select defaultValue={value} onValueChange={handleValueChange}>
            <SelectTrigger className="w-52">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {availableOptions.map(option => (
                    <SelectItem value={option} key={option}>
                        {sort[option]}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default SortSelect
