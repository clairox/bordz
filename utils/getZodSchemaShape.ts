import { z } from 'zod'

export const getZodSchemaShape = <TShape extends z.ZodRawShape>(
    schema: z.ZodTypeAny
) => {
    if (schema instanceof z.ZodObject) {
        return (schema as z.ZodObject<TShape>).shape
    } else if (schema instanceof z.ZodEffects) {
        return (schema as z.ZodEffects<z.ZodObject<TShape>>).sourceType().shape
    } else {
        throw new Error('Unhandled zod type')
    }
}
