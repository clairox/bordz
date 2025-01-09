import fetchAbsolute from '@/lib/fetchAbsolute'

const deleteProducts = async (ids: string[]): Promise<void> => {
    await fetchAbsolute('/products', {
        method: 'DELETE',
        body: JSON.stringify({ ids }),
    })
}

export default deleteProducts
