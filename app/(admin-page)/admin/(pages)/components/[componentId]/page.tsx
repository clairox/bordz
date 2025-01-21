'use client'

import { useParams } from 'next/navigation'
import { useSuspenseQuery } from '@tanstack/react-query'

import { fetchComponent } from '@/lib/api'
import { mapComponentResponseToComponent } from '@/utils/conversions'
import AdminUpdateComponentForm from '@/components/forms/AdminUpdateComponentForm'

const ComponentPage: React.FC = () => {
    const { componentId } = useParams<Record<string, string>>()
    const { data: component } = useSuspenseQuery<Component>({
        queryKey: ['components', componentId],
        queryFn: async () => {
            const data = await fetchComponent(componentId)
            return mapComponentResponseToComponent(data)
        },
    })

    return <AdminUpdateComponentForm component={component} />
}

export default ComponentPage
