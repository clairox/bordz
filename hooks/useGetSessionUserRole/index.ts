'use client'

import { useCallback } from 'react'

import useGetAuthSession from '../useGetAuthSession'
import { getUserRole } from '@/utils/helpers'

const useGetSessionUserRole = () => {
    const getAuthSession = useGetAuthSession()

    return useCallback(async () => {
        const session = await getAuthSession()
        if (!session) {
            return null
        }

        return getUserRole(session)
    }, [getAuthSession])
}

export default useGetSessionUserRole
