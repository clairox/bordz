import fetchAbsolute from '@/lib/fetchAbsolute'

const fetchCategories = async (): Promise<Category[]> => {
    const response = await fetchAbsolute('/categories', {
        cache: 'no-cache',
    })
    if (!response.ok) {
        throw response
    }
    return await response.json()
}

export default fetchCategories
