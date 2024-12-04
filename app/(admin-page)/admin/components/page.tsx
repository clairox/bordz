'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { InfiniteData, useSuspenseInfiniteQuery } from '@tanstack/react-query'

import PriceRepr from '@/components/PriceRepr'
import { Table, TableCell, TableHeader, TableRow } from '@/components/Table'
import fetchAbsolute from '@/lib/fetchAbsolute'

const ComponentsPage: React.FC = () => {
    const router = useRouter()

    const { data: components } = useSuspenseInfiniteQuery<
        Component[],
        Error,
        InfiniteData<Component[]>
    >({
        queryKey: ['components'],
        queryFn: async () => {
            try {
                const response = await fetchAbsolute('/components')

                if (!response.ok) {
                    throw response
                }

                return await response.json()
            } catch (error) {
                throw error
            }
        },
        initialPageParam: 0,
        getNextPageParam: () => {},
    })

    return (
        <div>
            <button onClick={() => router.push('/admin/components/new')}>
                New
            </button>
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
                    {components.pages[0].map(component => {
                        return (
                            <ComponentListItem
                                component={component}
                                key={component.id}
                            />
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

type ComponentListItemProps = {
    component: Component
}

const ComponentListItem: React.FC<ComponentListItemProps> = ({ component }) => {
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
