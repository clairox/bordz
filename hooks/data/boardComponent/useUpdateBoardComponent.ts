'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateBoardComponent } from '@/lib/api'
import { BoardComponentUpdateArgs } from '@/types/api'
import { mapBoardComponentResponseToBoardComponent } from '@/utils/conversions'

export const useUpdateBoardComponent = () => {
    const queryClient = useQueryClient()
    type MutationArgs = { id: string } & BoardComponentUpdateArgs
    return useMutation<BoardComponent, Error, MutationArgs>({
        mutationFn: async ({ id, ...args }) => {
            const data = await updateBoardComponent(id, args)
            return mapBoardComponentResponseToBoardComponent(data)
        },
        onSuccess: ({ id }) =>
            queryClient.invalidateQueries({
                queryKey: ['boardComponents', id],
            }),
    })
}
