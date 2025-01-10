import fetchAbsolute from '@/lib/fetchAbsolute'
import {
    ComponentCreateArgs,
    ComponentResponse,
    ComponentUpdateArgs,
} from '@/types/api'
import { buildParamString } from '@/utils/url'

export const fetchComponent = async (
    id: string
): Promise<ComponentResponse> => {
    return await fetchAbsolute<ComponentResponse>(`/components/${id}`, {
        cache: 'no-cache',
    })
}

type FetchManyComponentsOptions = { category?: string } & FetchManyOptions

export const fetchComponents = async (
    options?: FetchManyComponentsOptions
): Promise<Page<ComponentResponse>> => {
    let path = '/components'
    if (options) {
        path = path.concat(buildParamString(options))
    }

    return await fetchAbsolute<Page<ComponentResponse>>(path)
}

export const createComponent = async (
    args: ComponentCreateArgs
): Promise<ComponentResponse> => {
    return await fetchAbsolute<ComponentResponse>('/components', {
        method: 'POST',
        body: JSON.stringify(args),
    })
}

export const updateComponent = async (
    componentId: string,
    args?: ComponentUpdateArgs
): Promise<ComponentResponse> => {
    return await fetchAbsolute<ComponentResponse>(
        `/components/${componentId}`,
        {
            method: 'PATCH',
            body: JSON.stringify(args),
        }
    )
}

export const deleteComponents = async (ids: string[]): Promise<void> => {
    await fetchAbsolute('/components', {
        method: 'DELETE',
        body: JSON.stringify({ ids }),
    })
}
