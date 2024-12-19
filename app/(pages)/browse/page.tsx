'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'

import ProductsList from '@/components/ProductsList'
import useProducts from '@/hooks/useProducts'
import SortSelect from '@/components/SortSelect'

const BrowsePage: React.FC = () => {
    const searchParams = useSearchParams()
    const page = Number(searchParams.get('page')) || 1
    const pageSize = Number(searchParams.get('size')) || 40
    const orderBy = (searchParams.get('orderBy') as SortKey) || undefined

    const { data, status, fetchNextPage, hasNextPage } = useProducts({
        page,
        size: pageSize,
        orderBy,
    })

    const products = useMemo(() => {
        const products: Product[] = []
        if (data) {
            data.pages.forEach(page => products.push(...page.data))
        }

        return products
    }, [data])

    if (status === 'error') {
        return <div>Error</div>
    }

    if (status === 'pending') {
        return <div>Loading...</div>
    }

    return (
        <div>
            <div className="pl-4 py-4 w-full border-b border-black">
                <div className="flex">
                    <label htmlFor="sortSelect">Sort by</label>
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
            </div>
            <ProductsList products={products} />
            {hasNextPage && (
                <button onClick={() => fetchNextPage()}>Load more</button>
            )}
        </div>
    )
}

export default BrowsePage
