import { ComponentRecord } from '@/types/database'

const getComponentsOverallAvailability = (
    components: Record<string, ComponentRecord>
): boolean => {
    return Object.values(components).every(
        component => component.availableForSale
    )
}

export default getComponentsOverallAvailability
