'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'

import ProductsList from '@/components/ProductsList'
import useProducts from '@/hooks/useProducts'

const BrowsePage: React.FC = () => {
    const searchParams = useSearchParams()
    const page = Number(searchParams.get('page')) || 1
    const pageSize = Number(searchParams.get('size')) || 40

    const { data, status, fetchNextPage, hasNextPage } = useProducts({
        page,
        size: pageSize,
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
            <ProductsList products={products} />
            {hasNextPage && (
                <button onClick={() => fetchNextPage()}>Load more</button>
            )}
        </div>
    )
}

export default BrowsePage
