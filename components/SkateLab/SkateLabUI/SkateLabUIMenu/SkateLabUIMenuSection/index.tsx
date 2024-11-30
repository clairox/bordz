import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import SkateLabUIMenuList from '../SkateLabUIMenuList'
import { useEffect } from 'react'

type SkateLabUIMenuSectionProps = {
    section: Category['label']
}

const SkateLabUIMenuSection: React.FC<SkateLabUIMenuSectionProps> = ({
    section,
}) => {
    const queryClient = useQueryClient()

    const { data: components } = useSuspenseQuery<Component[]>({
        queryKey: ['components', section],
        queryFn: async () => {
            return []
        },
    })

    // TODO: See if this is even necessary
    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: ['components'] })
    }, [section, queryClient])

    return (
        <div>
            <SkateLabUIMenuList components={components} />
        </div>
    )
}

export default SkateLabUIMenuSection
