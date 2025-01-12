'use client'

import { Skeleton } from '@/components/ui/Skeleton'
import { useSupabase } from '@/context/SupabaseContext'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type StoredPreviewImageProps = {
    path?: string
    alt: string
}

const StoredPreviewImage: React.FC<StoredPreviewImageProps> = ({
    path,
    alt,
}) => {
    const supabase = useSupabase()

    const [src, setSrc] = useState<string | undefined>(undefined)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!path) {
            return
        }

        setLoading(true)
        const {
            data: { publicUrl },
        } = supabase.storage
            .from('images')
            .getPublicUrl(path, { download: true })

        setSrc(publicUrl)
        setLoading(false)
    }, [path, supabase])

    if (loading) {
        return <Skeleton className="w-full h-full rounded-none" />
    }

    if (src) {
        return (
            <Image
                src={src}
                alt={alt}
                sizes="100vw"
                width="650"
                height="770"
                style={{ width: '100%', height: 'auto' }}
            />
        )
    }
    return <div className="w-full h-full bg-gray-50 hover:bg-gray-100" />
}

export default StoredPreviewImage
