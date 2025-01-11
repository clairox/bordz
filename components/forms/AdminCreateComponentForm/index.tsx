'use client'

import { useCreateComponent } from '@/hooks/data/component'
import AdminCreateComponentFormSchema from './schema'
import {
    fetchCategories,
    fetchColors,
    fetchSizes,
    fetchVendors,
} from '@/lib/api'
import DataForm from '@/components/common/DataForm'
import { useRouter } from 'next/navigation'

const AdminCreateComponentForm: React.FC = () => {
    const { mutateAsync: createComponent } = useCreateComponent()
    const router = useRouter()

    return (
        <DataForm
            Schema={AdminCreateComponentFormSchema}
            defaultValues={{
                title: '',
                price: '',
                images: [],
                model: undefined,
                description: '',
                specifications: [],
                totalInventory: '',
                category: '',
                vendor: '',
                size: '',
                color: '',
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
                    type: 'selectAsync',
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
                },
                {
                    type: 'selectAsync',
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
                await createComponent({
                    ...data,
                    images: data.images || [],
                    price: parseFloat(data.price),
                    totalInventory: parseFloat(data.totalInventory),
                })
                router.push('/admin/components')
            }}
        />
    )
}

export default AdminCreateComponentForm
