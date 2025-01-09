'use client'

import { useParams } from 'next/navigation'
import { useSuspenseQuery } from '@tanstack/react-query'

import {
    fetchCategories,
    fetchColors,
    fetchComponent,
    fetchSizes,
    fetchVendors,
} from '@/lib/api'
import EditComponentFormSchema from './schema'
import AdminResourceDataForm from '@/components/AdminResourceDataForm'
import { useUpdateComponent } from '@/hooks'

const ComponentPage: React.FC = () => {
    const params = useParams()
    const { data: component } = useSuspenseQuery<Component>({
        queryKey: ['components', params.componentId],
        queryFn: () => fetchComponent(params.componentId as string),
    })

    const { mutateAsync: updateComponent } = useUpdateComponent(component.id)

    return (
        <AdminResourceDataForm
            Schema={EditComponentFormSchema}
            header={`Edit '${component.title}'`}
            defaultValues={{
                title: component.title,
                price: component.price.toString(),
                images: component.images || [],
                model: component.model,
                description: component.description,
                specifications: component.specifications,
                totalInventory: component.totalInventory.toString(),
                category: component.category.id,
                vendor: component.vendor.id,
                size: component.size.id,
                color: component.color.id,
            }}
            fieldData={[
                {
                    type: 'text',
                    name: 'title',
                    label: 'Title *',
                    autoFocus: true,
                },
                {
                    type: 'text',
                    name: 'price',
                    label: 'Price (without decimal) *',
                },
                {
                    type: 'text',
                    name: 'totalInventory',
                    label: 'Quantity *',
                },
                {
                    type: 'textArea',
                    name: 'description',
                    label: 'Description',
                },
                {
                    type: 'assets',
                    name: 'images',
                    label: 'Images',
                    bucket: 'images',
                    folder: 'components',
                    accept: 'image/*',
                },
                {
                    type: 'assets',
                    name: 'model',
                    label: 'Model',
                    bucket: 'models',
                    accept: '.fbx',
                    max: 1,
                },
                {
                    type: 'selectAsync',
                    name: 'category',
                    label: 'Category *',
                    fetch: async () => {
                        const categories = await fetchCategories()
                        return categories.map(category => ({
                            value: category.id,
                            name: category.label as string,
                        }))
                    },
                },
                {
                    type: 'selectAsync',
                    name: 'vendor',
                    label: 'Vendor *',
                    fetch: async () => {
                        const vendors = await fetchVendors()
                        return vendors.map(vendor => ({
                            value: vendor.id,
                            name: vendor.name,
                        }))
                    },
                },
                {
                    type: 'selectAsync',
                    name: 'size',
                    label: 'Size *',
                    fetch: async () => {
                        const sizes = await fetchSizes()
                        return sizes.map(size => ({
                            value: size.id,
                            name: size.label,
                        }))
                    },
                },
                {
                    type: 'selectAsync',
                    name: 'color',
                    label: 'Color *',
                    fetch: async () => {
                        const colors = await fetchColors()
                        return colors.map(color => ({
                            value: color.id,
                            name: color.label,
                        }))
                    },
                },
            ]}
            onSubmit={data =>
                updateComponent({
                    ...data,
                    price: parseInt(data.price),
                    totalInventory: parseInt(data.totalInventory),
                })
            }
        />
    )
}

export default ComponentPage
