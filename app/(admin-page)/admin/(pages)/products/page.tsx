'use client'

import { Fragment } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

import InfiniteItemList from '@/components/InfiniteItemList'
import PriceRepr from '@/components/PriceRepr'
import { Table, TableCell, TableHeader, TableRow } from '@/components/Table'
import useProducts from '@/hooks/useProducts'

const ProductsPage = () => {
    const searchParams = useSearchParams()
    const page = Number(searchParams.get('page')) || 1
    const pageSize = Number(searchParams.get('size')) || 40
    const orderBy = (searchParams.get('orderBy') as SortKey) || undefined

    const { data, status, fetchNextPage, hasNextPage } = useProducts({
        page,
        size: pageSize,
        orderBy,
    })

    if (status === 'error') {
        return <div>Error</div>
    }

    if (status === 'pending') {
        return <div>Loading...</div>
    }

    return (
        <div>
            <InfiniteItemList
                pages={data.pages}
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
                render={items => (
                    <Table>
                        <thead>
                            <tr>
                                <TableHeader>Title</TableHeader>
                                <TableHeader>Price</TableHeader>
                                <TableHeader>Availability</TableHeader>
                                <TableHeader>Type</TableHeader>
                                <TableHeader>Public</TableHeader>
                            </tr>
                        </thead>
                        <tbody>
                            <ProductsTableList products={items} />
                        </tbody>
                    </Table>
                )}
            />
        </div>
    )
}

type ProductsTableListProps = {
    products: Product[]
}

const ProductsTableList: React.FC<ProductsTableListProps> = ({ products }) => {
    return (
        <Fragment>
            {products.map(product => {
                return (
                    <ProductsTableListItem product={product} key={product.id} />
                )
            })}
        </Fragment>
    )
}

type ProductsTableListItemProps = {
    product: Product
}

const ProductsTableListItem: React.FC<ProductsTableListItemProps> = ({
    product,
}) => {
    return (
        <TableRow>
            <TableCell>
                <Link href={`/admin/products/${product.id}`}>
                    {product.title}
                </Link>
            </TableCell>
            <TableCell>
                <PriceRepr value={product.price} />
            </TableCell>
            <TableCell>{String(product.availableForSale)}</TableCell>
            <TableCell>{product.productType}</TableCell>
            <TableCell>{String(product.isPublic)}</TableCell>
        </TableRow>
    )
}

export default ProductsPage
