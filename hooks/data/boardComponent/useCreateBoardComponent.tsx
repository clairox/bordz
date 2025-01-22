'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { BoardComponentCreateArgs } from '@/types/api'
import { mapBoardComponentResponseToBoardComponent } from '@/utils/conversions'
import { createBoardComponent } from '@/lib/api'

export const useCreateBoardComponent = () => {
    const queryClient = useQueryClient()

    return useMutation<BoardComponent, Error, BoardComponentCreateArgs>({
        mutationFn: async args => {
            const data = await createBoardComponent(args)
            return mapBoardComponentResponseToBoardComponent(data)
        },
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['boardComponents'] }),
    })
}
