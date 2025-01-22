import fetchAbsolute from '@/lib/fetchAbsolute'
import {
    BoardComponentCreateArgs,
    BoardComponentResponse,
    BoardComponentUpdateArgs,
    PaginatedQueryOptions,
} from '@/types/api'
import { buildParamString } from '@/utils/url'

export const fetchBoardComponent = async (
    id: string
): Promise<BoardComponentResponse> => {
    return await fetchAbsolute<BoardComponentResponse>(
        `/boardComponents/${id}`,
        {
            cache: 'no-cache',
        }
    )
}

type FetchBoardComponentsOptions = PaginatedQueryOptions & { category?: string }

export const fetchBoardComponents = async (
    options?: FetchBoardComponentsOptions
): Promise<Page<BoardComponentResponse>> => {
    let path = '/boardComponents'
    if (options) {
        path = path.concat(buildParamString(options))
    }

    return await fetchAbsolute<Page<BoardComponentResponse>>(path)
}

export const createBoardComponent = async (
    args: BoardComponentCreateArgs
): Promise<BoardComponentResponse> => {
    return await fetchAbsolute<BoardComponentResponse>('/boardComponents', {
        method: 'POST',
        body: JSON.stringify(args),
    })
}

export const updateBoardComponent = async (
    boardComponentId: string,
    args?: BoardComponentUpdateArgs
): Promise<BoardComponentResponse> => {
    return await fetchAbsolute<BoardComponentResponse>(
        `/boardComponents/${boardComponentId}`,
        {
            method: 'PATCH',
            body: JSON.stringify(args),
        }
    )
}

export const deleteBoardComponents = async (ids: string[]): Promise<void> => {
    await fetchAbsolute('/boardComponents', {
        method: 'DELETE',
        body: JSON.stringify({ ids }),
    })
}
