'use client'

import { useSuspenseQuery } from '@tanstack/react-query'

import { useSupabase } from '@/context/SupabaseContext'
import { UNEXPECTED_ERROR_TEXT } from '@/utils/constants'

export const useAssets = (
    bucket: string,
    folder?: string,
    paths?: string[]
) => {
    const supabase = useSupabase()

    const listPaths = async () => {
        const { data, error } = await supabase.storage.from(bucket).list(folder)
        if (error) {
            throw error
        }
        if (!data) {
            throw new Error(UNEXPECTED_ERROR_TEXT)
        }
        return data
            .filter(item => item.name !== '.emptyFolderPlaceholder')
            .map(item => (folder ? `${folder}/${item.name}` : item.name))
    }

    const serveAssets = async () => {
        let _paths = paths || []
        if (!paths) {
            _paths = await listPaths()
        }

        if (_paths.length === 0) {
            return []
        }

        const { data, error } = await supabase.storage
            .from(bucket)
            .createSignedUrls(_paths, 60)
        if (error) {
            throw error
        }
        if (!data) {
            throw new Error(UNEXPECTED_ERROR_TEXT)
        }

        return data.map(item => ({
            ...item,
            isSelected: !!paths?.includes(item.path || ''),
        }))
    }

    return useSuspenseQuery<AssetData[]>({
        queryKey: ['assets', bucket, folder, paths],
        queryFn: serveAssets,
    })
}
