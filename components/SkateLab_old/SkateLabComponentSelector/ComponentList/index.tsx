import { useQuery } from '@tanstack/react-query'

import fetchAbsolute from '@/lib/fetchAbsolute'
import SkateLabComponentListItem from '../ComponentListItem'
import { useComponentSelector } from '../ComponentSelectorContext'

const SkateLabComponentList: React.FC = () => {
    const { currentCategory: category, selectedComponents } =
        useComponentSelector()

    const { data: components, status } = useQuery<Component[]>({
        queryKey: ['components', category],
        queryFn: async () => {
            try {
                const res = await fetchAbsolute(
                    `/components?category=${category}`
                )

                if (!res.ok) {
                    throw res
                }

                return await res.json()
            } catch (error) {
                throw error
            }
        },
    })

    if (status === 'error') {
        return <div></div>
    }

    if (status === 'pending') {
        return <div>Loading {category}...</div>
    }

    return (
        <div className="w-full border-t border-black">
            <div className="flex flex-col gap-[1px] w-full bg-black">
                {components.map(component => {
                    const isSelectedComponent = Object.values(
                        selectedComponents
                    ).includes(component.id)

                    return (
                        <SkateLabComponentListItem
                            component={component}
                            isSelected={isSelectedComponent}
                            key={component.id}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default SkateLabComponentList
