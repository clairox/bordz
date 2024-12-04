import { useSuspenseQuery } from '@tanstack/react-query'

import SkateLabUIMenuList from '../SkateLabUIMenuList'
import fetchAbsolute from '@/lib/fetchAbsolute'

type SkateLabUIMenuSectionProps = {
    section: Category['label']
}

const SkateLabUIMenuSection: React.FC<SkateLabUIMenuSectionProps> = ({
    section,
}) => {
    // TODO: Use infinite query
    const { data: components } = useSuspenseQuery<Component[]>({
        queryKey: ['components', section],
        queryFn: async () => {
            const response = await fetchAbsolute(
                `/components?category=${section}`
            )
            if (!response.ok) {
                throw response
            }
            return await response.json()
        },
    })

    return (
        <div className="relative pt-12 h-full">
            <div className="flex flex-col w-full h-full overflow-auto">
                <SkateLabUIMenuList components={components} />
                <div className="h-full border-t border-black">
                    <p className="py-2 text-center text-gray-700">
                        Showing {components.length} of {components.length}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SkateLabUIMenuSection
