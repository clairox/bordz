import fetchAbsolute from '@/lib/fetchAbsolute'

const killSession = async () => {
    try {
        const res = await fetchAbsolute(`/session`, {
            method: 'DELETE',
        })

        if (!res.ok) {
            throw res
        }

        return null
    } catch (error) {
        throw error
    }
}

export default killSession
