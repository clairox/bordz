import fetchAbsolute from '@/lib/fetchAbsolute'

const deleteProducts = async (ids: string[]): Promise<void> => {
    const response = await fetchAbsolute('/products', {
        method: 'DELETE',
        body: JSON.stringify({ ids }),
    })
    if (!response.ok) {
        throw response
    }
}

export default deleteProducts
