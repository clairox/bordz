import fetchAbsolute from '@/lib/fetchAbsolute'

export const fetchCategories = async (): Promise<Category[]> => {
    return await fetchAbsolute<Category[]>('/categories', {
        cache: 'no-cache',
    })
}
