import fetchAbsolute from '@/lib/fetchAbsolute'

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
    const response = await fetchAbsolute(`/components/${componentId}`, {
        method: 'PATCH',
        body: JSON.stringify(args),
    })
    if (!response.ok) {
        throw response
    }
    return await response.json()
}

export default updateComponent
