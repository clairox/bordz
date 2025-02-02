import { z } from 'zod'

export const PostAddressSchema = z.object({
    ownerId: z.string().optional(),
    fullName: z.string(),
    line1: z.string(),
    line2: z.string().optional(),
    city: z.string(),
    state: z.string(),
    countryCode: z.string().default('US'),
    postalCode: z.string(),
    isCustomerDefault: z.boolean().optional(),
})
export const PostBoardComponentSchema = z.object({
    title: z.string(),
    price: z.number(),
    compareAtPrice: z.number().optional(),
    images: z.array(z.string()),
    model: z.string().optional(),
    description: z.string().optional(),
    specifications: z.array(z.string()),
    totalInventory: z.number(),
    category: z.string(),
    vendor: z.string(),
    size: z.string(),
    color: z.string(),
})

export const PatchAddressSchema = PostAddressSchema.omit({
    ownerId: true,
}).partial()

export const DeleteBoardComponentSchema = z.object({
    ids: z.array(z.string()),
})
