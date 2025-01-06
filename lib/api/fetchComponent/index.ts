import fetchAbsolute from '@/lib/fetchAbsolute'

const fetchComponent = async (id: string) => {
    const response = await fetchAbsolute(`/components/${id}`, {
        cache: 'no-cache',
    })
    if (!response.ok) {
        throw response
    }
    return await response.json()
}

export default fetchComponent
