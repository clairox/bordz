import fetchAbsolute from '@/lib/fetchAbsolute'

const deleteComponents = async (ids: string[]): Promise<void> => {
    await fetchAbsolute('/components', {
        method: 'DELETE',
        body: JSON.stringify({ ids }),
    })
}

export default deleteComponents
