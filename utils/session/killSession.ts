import fetchAbsolute from '@/lib/fetchAbsolute'

export const killSession = async () => {
    await fetchAbsolute(`/session`, {
        method: 'DELETE',
    })
    return null
}
