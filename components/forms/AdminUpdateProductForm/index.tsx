'use client'

import { useRouter } from 'next/navigation'

import DataForm from '@/components/common/DataForm'
import AdminUpdateProductFormSchema from './schema'
import { useUpdateProduct } from '@/hooks/data/product'

type AdminUpdateProductFormProps = {
    product: Product
}

const AdminUpdateProductForm: React.FC<AdminUpdateProductFormProps> = ({
    product,
}) => {
    const { mutateAsync: updateProduct } = useUpdateProduct(product.id)
    const router = useRouter()

    return (
        <DataForm
            Schema={AdminUpdateProductFormSchema}
            defaultValues={{
                title: product.title,
                featuredImage: product.featuredImage ?? undefined,
                price: product.price.toString(),
                isPublic: product.isPublic,
            }}
            fieldData={[
                {
                    type: 'text',
                    name: 'title',
                    label: 'Title',
                    autoFocus: true,
                },
                {
                    type: 'assets',
                    name: 'featuredImage',
                    label: 'Featured image',
                    bucket: 'products',
                    accept: 'image/*',
                    max: 1,
                },
                {
                    type: 'text',
                    name: 'price',
                    label: 'Price (without decimal)',
                },
                {
                    type: 'checkbox',
                    name: 'isPublic',
                    label: 'Set as public?',
                },
            ]}
            onSubmit={async data => {
                await updateProduct({
                    ...data,
                    price: parseInt(data.price),
                })
                router.push('/admin/products')
            }}
        />
    )
}

export default AdminUpdateProductForm
