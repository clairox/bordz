import { createBadRequestError } from '@/lib/errors'

export const validateRequestBody = (
    body: Record<string, unknown>,
    requiredFields: string[]
) => {
    const missingFields = requiredFields.filter(
        field => body[field] == undefined
    )

    if (missingFields.length > 0) {
        throw createBadRequestError(
            `Missing required fields: "${missingFields.join('", "')}"`
        )
    }
}
