'use client'

import { useCreateBoardComponent } from '@/hooks/data/boardComponent'
import AdminCreateBoardComponentFormSchema from './schema'
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

const AdminCreateBoardComponentForm: React.FC = () => {
    const { mutateAsync: createBoardComponent } = useCreateBoardComponent()
    const router = useRouter()

    return (
        <DataForm
            Schema={AdminCreateBoardComponentFormSchema}
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
                await createBoardComponent({
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

export default AdminCreateBoardComponentForm
