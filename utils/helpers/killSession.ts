import fetchAbsolute from '@/lib/fetchAbsolute'

const killSession = async () => {
    await fetchAbsolute(`/session`, {
        method: 'DELETE',
    })
    return null
}

export default killSession
