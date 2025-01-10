'use client'

import { useParams } from 'next/navigation'
import { useSuspenseQuery } from '@tanstack/react-query'

import { fetchProduct } from '@/lib/api'
import EditProductFormSchema from './schema'
import AdminResourceDataForm from '@/components/AdminResourceDataForm'
import { useUpdateProduct } from '@/hooks'
import productResponseToProduct from '@/utils/helpers/productResponseToProduct'

const ProductPage: React.FC = () => {
    const params = useParams()
    const { data: product } = useSuspenseQuery<Product>({
        queryKey: ['product', params.productId],
        queryFn: async () => {
            const data = await fetchProduct(params.productId as string)
            return productResponseToProduct(data)
        },
    })

    const { mutateAsync: updateProduct } = useUpdateProduct(product.id)

    return (
        <AdminResourceDataForm
            Schema={EditProductFormSchema}
            header={`Edit '${product.title}'`}
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
                    label: 'Title *',
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
                    label: 'Price (without decimal) *',
                },
                {
                    type: 'checkbox',
                    name: 'isPublic',
                    label: 'Public?',
                },
            ]}
            onSubmit={data =>
                updateProduct({
                    ...data,
                    price: parseInt(data.price),
                })
            }
        />
    )
}

export default ProductPage
