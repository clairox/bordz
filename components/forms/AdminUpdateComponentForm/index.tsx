'use client'

import { useUpdateComponent } from '@/hooks/data/component'
import AdminUpdateComponentFormSchema from './schema'
import {
    createSize,
    createVendor,
    fetchCategories,
    fetchColors,
    fetchSizes,
    fetchVendors,
} from '@/lib/api'
import DataForm from '@/components/common/DataForm'
import { useRouter } from 'next/navigation'

type AdminUpdateComponentFormProps = {
    component: Component
}

const AdminUpdateComponentForm: React.FC<AdminUpdateComponentFormProps> = ({
    component,
}) => {
    const { mutateAsync: updateComponent } = useUpdateComponent()
    const router = useRouter()

    return (
        <DataForm
            Schema={AdminUpdateComponentFormSchema}
            defaultValues={{
                title: component.title,
                price: component.price.toString(),
                images: component.images || [],
                model: component.model,
                description: component.description,
                specifications: component.specifications ?? [],
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
                    label: 'Title',
                    autoFocus: true,
                },
                {
                    type: 'textarea',
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
                    type: 'text',
                    name: 'price',
                    label: 'Price (without decimal)',
                },
                {
                    type: 'text',
                    name: 'totalInventory',
                    label: 'Quantity',
                },
                {
                    type: 'textlist',
                    name: 'specifications',
                    label: 'Specifications',
                    placeholder: 'Enter component specifications...',
                    limit: 15,
                },
                {
                    type: 'selectAsync',
                    name: 'category',
                    label: 'Category',
                    placeholder: 'Select a category...',
                    fetchOptions: async () => {
                        const categories = await fetchCategories()
                        return categories.map(category => ({
                            value: category.id,
                            name: category.label as string,
                        }))
                    },
                },
                {
                    type: 'customSelectAsync',
                    name: 'vendor',
                    label: 'Vendor',
                    placeholder: 'Select a vendor...',
                    fetchOptions: async () => {
                        const vendors = await fetchVendors()
                        return vendors.map(vendor => ({
                            value: vendor.id,
                            name: vendor.name,
                        }))
                    },
                    addOption: async (value: string) => {
                        const vendor = await createVendor(value)
                        return { value: vendor.id, name: vendor.name }
                    },
                },
                {
                    type: 'customSelectAsync',
                    name: 'size',
                    label: 'Size',
                    placeholder: 'Select a size...',
                    fetchOptions: async () => {
                        const sizes = await fetchSizes()
                        return sizes.map(size => ({
                            value: size.id,
                            name: size.label,
                        }))
                    },
                    addOption: async (value: string) => {
                        const size = await createSize(value)
                        return { value: size.id, name: size.label }
                    },
                },
                {
                    type: 'selectAsync',
                    name: 'color',
                    label: 'Color',
                    placeholder: 'Select a color...',
                    fetchOptions: async () => {
                        const colors = await fetchColors()
                        return colors.map(color => ({
                            value: color.id,
                            name: color.label,
                        }))
                    },
                },
            ]}
            onSubmit={async data => {
                await updateComponent({
                    id: component.id,
                    ...data,
                    price: parseInt(data.price),
                    totalInventory: parseInt(data.totalInventory),
                })
                router.push('/admin/components')
            }}
        />
    )
}

export default AdminUpdateComponentForm
