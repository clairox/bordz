import fetchAbsolute from '@/lib/fetchAbsolute'

const fetchCategories = async (): Promise<Category[]> => {
    return await fetchAbsolute<Category[]>('/categories', {
        cache: 'no-cache',
    })
}

export default fetchCategories
