import fetchAbsolute from '@/lib/fetchAbsolute'
import { ComponentResponse } from '@/types/api'
import componentResponseToComponent from '@/utils/helpers/componentResponseToComponent'

type UpdateComponentArgs = {
    title: string
    price: number
    image?: string[]
    model?: string
    description?: string
    specifications?: string[]
    totalInventory: number
    category: string
    vendor: string
    size: string
    color: string
}

// TODO: PUT (?)
const updateComponent = async (
    componentId: string,
    args?: UpdateComponentArgs
): Promise<Component> => {
    const data = await fetchAbsolute<ComponentResponse>(
        `/components/${componentId}`,
        {
            method: 'PATCH',
            body: JSON.stringify(args),
        }
    )
    return componentResponseToComponent(data)
}

export default updateComponent
