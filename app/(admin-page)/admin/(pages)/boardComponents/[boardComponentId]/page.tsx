'use client'

import { useParams } from 'next/navigation'
import { useSuspenseQuery } from '@tanstack/react-query'

import { fetchBoardComponent } from '@/lib/api'
import { mapBoardComponentResponseToBoardComponent } from '@/utils/conversions'
import AdminUpdateBoardComponentForm from '@/components/forms/AdminUpdateBoardComponentForm'

const BoardComponentPage: React.FC = () => {
    const { boardComponentId } = useParams<Record<string, string>>()
    const { data: boardComponent } = useSuspenseQuery<BoardComponent>({
        queryKey: ['boardComponents', boardComponentId],
        queryFn: async () => {
            const data = await fetchBoardComponent(boardComponentId)
            return mapBoardComponentResponseToBoardComponent(data)
        },
    })

    return <AdminUpdateBoardComponentForm boardComponent={boardComponent} />
}

export default BoardComponentPage
