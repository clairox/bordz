'use client'

import { useParams } from 'next/navigation'
import { useSuspenseQuery } from '@tanstack/react-query'

import { fetchComponent } from '@/lib/api'
import { mapComponentResponseToComponent } from '@/utils/conversions'
import AdminUpdateComponentForm from '@/components/forms/AdminUpdateComponentForm'

const ComponentPage: React.FC = () => {
    const params = useParams()
    const { data: component } = useSuspenseQuery<Component>({
        queryKey: ['components', params.componentId],
        queryFn: async () => {
            const data = await fetchComponent(params.componentId as string)
            return mapComponentResponseToComponent(data)
        },
    })

    return <AdminUpdateComponentForm component={component} />
}

export default ComponentPage
