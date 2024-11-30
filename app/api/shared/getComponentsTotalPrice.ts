import { ComponentRecord } from '@/types/records'

const getComponentsTotalPrice = (
    components: Record<string, ComponentRecord>
): number => {
    return Object.values(components).reduce(
        (price, component) => price + component.price,
        0
    )
}

export default getComponentsTotalPrice
