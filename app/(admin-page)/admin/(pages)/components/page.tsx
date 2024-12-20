'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import PriceRepr from '@/components/PriceRepr'
import { Table, TableCell, TableHeader, TableRow } from '@/components/Table'
import { Fragment } from 'react'
import InfiniteItemList from '@/components/InfiniteItemList'
import useComponents from '@/hooks/useComponents'

const ComponentsPage: React.FC = () => {
    const searchParams = useSearchParams()
    const page = Number(searchParams.get('page')) || 1
    const pageSize = Number(searchParams.get('size')) || 40
    const orderBy = (searchParams.get('orderBy') as SortKey) || undefined

    const { data, fetchNextPage, hasNextPage } = useComponents({
        size: pageSize,
        orderBy,
    })

    const router = useRouter()

    return (
        <div>
            <button onClick={() => router.push('/admin/components/new')}>
                New
            </button>
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
                                <TableHeader>Quantity</TableHeader>
                                <TableHeader>Brand</TableHeader>
                                <TableHeader>Category</TableHeader>
                                <TableHeader>Size</TableHeader>
                                <TableHeader>Color</TableHeader>
                            </tr>
                        </thead>
                        <tbody>
                            <ComponentTableList components={items} />
                        </tbody>
                    </Table>
                )}
            />
        </div>
    )
}

type ComponentTableListProps = {
    components: Component[]
}

const ComponentTableList: React.FC<ComponentTableListProps> = ({
    components,
}) => {
    return (
        <Fragment>
            {components.map(component => {
                return (
                    <ComponentTableListItem
                        component={component}
                        key={component.id}
                    />
                )
            })}
        </Fragment>
    )
}

type ComponentTableListItemProps = {
    component: Component
}

const ComponentTableListItem: React.FC<ComponentTableListItemProps> = ({
    component,
}) => {
    const componentAttributes = component.componentAttributes
    return (
        <TableRow>
            <TableCell>
                <Link href={`/admin/components/${component.id}`}>
                    {component.title}
                </Link>
            </TableCell>
            <TableCell>
                <PriceRepr value={component.price} />
            </TableCell>
            <TableCell>{component.totalInventory}</TableCell>
            <TableCell>{componentAttributes.vendor.name}</TableCell>
            <TableCell>{componentAttributes.category.label}</TableCell>
            <TableCell>{componentAttributes.size.label}</TableCell>
            <TableCell>{componentAttributes.color.label}</TableCell>
        </TableRow>
    )
}

export default ComponentsPage
