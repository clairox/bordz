'use client'

import { useParams } from 'next/navigation'
import { useSuspenseQuery } from '@tanstack/react-query'

import { fetchProduct } from '@/lib/api'
import { mapProductResponseToProduct } from '@/utils/conversions'
import AdminUpdateProductForm from '@/components/forms/AdminUpdateProductForm'

const ProductPage: React.FC = () => {
    const { productId } = useParams<Record<string, string>>()
    const { data: product } = useSuspenseQuery<Product>({
        queryKey: ['product', productId],
        queryFn: async () => {
            const data = await fetchProduct(productId)
            return mapProductResponseToProduct(data)
        },
    })

    return <AdminUpdateProductForm product={product} />
}

export default ProductPage
