import fetchAbsolute from '@/lib/fetchAbsolute'
import { ComponentResponse } from '@/types/api'
import componentResponseToComponent from '@/utils/helpers/componentResponseToComponent'

const fetchComponent = async (id: string): Promise<Component> => {
    const data = await fetchAbsolute<ComponentResponse>(`/components/${id}`, {
        cache: 'no-cache',
    })
    return componentResponseToComponent(data)
}

export default fetchComponent
