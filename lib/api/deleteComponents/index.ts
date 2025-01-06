import fetchAbsolute from '@/lib/fetchAbsolute'

const deleteComponents = async (ids: string[]): Promise<void> => {
    const response = await fetchAbsolute('/components', {
        method: 'DELETE',
        body: JSON.stringify({ ids }),
    })
    if (!response.ok) {
        throw response
    }
}

export default deleteComponents
