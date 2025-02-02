import { NextRequest } from 'next/server'
import { z } from 'zod'

import { createBadRequestError } from '../errors'

export const chkRequest = async <TSchema extends z.AnyZodObject>(
    schema: TSchema,
    request: NextRequest
): Promise<z.infer<TSchema>> => {
    try {
        const data = await request.json()
        return schema.parse(data)
    } catch {
        throw createBadRequestError()
    }
}
