import fetchAbsolute from '@/lib/fetchAbsolute'

export const clearSessionCookies = async (): Promise<void> => {
    await fetchAbsolute('/session/cookies', { method: 'DELETE' })
}
