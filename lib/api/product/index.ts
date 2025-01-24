import fetchAbsolute from '@/lib/fetchAbsolute'
import {
    PaginatedQueryOptions,
    ProductCreateArgs,
    ProductResponse,
    ProductUpdateArgs,
} from '@/types/api'
import { mapProductResponseToProduct } from '@/utils/conversions'

export const fetchProduct = async (id: string) => {
    return await fetchAbsolute<ProductResponse>(`/products/${id}`, {
        cache: 'no-cache',
    })
}

type FetchProductsOptions = PaginatedQueryOptions & { publicOnly?: boolean }

export const fetchProducts = async ({
    size,
    page,
    orderBy,
    publicOnly,
}: FetchProductsOptions): Promise<Page<ProductResponse>> => {
    const params = []
    if (size != undefined) {
        params.push(`size=${size}`)
    }

    if (page != undefined) {
        params.push(`page=${page}`)
    }

    if (orderBy) {
        params.push(`orderBy=${orderBy}`)
    }

    if (publicOnly) {
        params.push(`publicOnly=${publicOnly}`)
    }

    const paramString = params.length ? '?' + params.join('&') : ''
    const path = '/products' + paramString
    return await fetchAbsolute<Page<ProductResponse>>(path, {
        cache: 'no-cache',
    })
}

export const createProduct = async (
    args: ProductCreateArgs
): Promise<Product> => {
    const response = await fetchAbsolute<ProductResponse>('/products', {
        method: 'POST',
        body: JSON.stringify(args),
    })
    return mapProductResponseToProduct(response)
}

export const updateProduct = async (
    productId: string,
    args?: ProductUpdateArgs
): Promise<ProductResponse> => {
    return await fetchAbsolute<ProductResponse>(`/products/${productId}`, {
        method: 'PATCH',
        body: JSON.stringify(args),
    })
}

export const deleteProducts = async (ids: string[]): Promise<void> => {
    await fetchAbsolute('/products', {
        method: 'DELETE',
        body: JSON.stringify({ ids }),
    })
}
