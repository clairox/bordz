'use client'

import { useCallback } from 'react'

import { useGetAuthSession } from '.'
import { getUserRole } from '@/utils/session'

export const useGetSessionUserRole = () => {
    const getAuthSession = useGetAuthSession()

    return useCallback(async () => {
        const session = await getAuthSession()
        if (!session) {
            return null
        }

        return getUserRole(session)
    }, [getAuthSession])
}
