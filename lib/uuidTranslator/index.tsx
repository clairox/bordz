import shortUUID from 'short-uuid'

const translator = shortUUID()

type Resource = {
    id: string
} & Record<string, any>

export const shortenResourceUUID = (data: Resource) => {
    const { id, ...rest } = data

    return { id: toShortUUID(id), ...rest }
}

export const toLongUUID = (value: string) => {
    if (translator.validate(value, true)) {
        return translator.toUUID(value)
    }

    return value
}

export const toShortUUID = (value: string) => translator.fromUUID(value)
